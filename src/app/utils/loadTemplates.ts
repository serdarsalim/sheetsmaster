import Papa from 'papaparse';
import { Template } from '@/app/templates';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSjtzEuoELVWkFDCZ0vBsutQq5bVGoha5Valcxga9-c0DXqFdNr8fg0hI5KexsDrIigdZrerGQzDvfP/pub?gid=0&single=true&output=csv';
const FALLBACK_URL = '/data/fallback-templates.csv';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Add cache interface
interface CacheItem {
  data: Template[];
  timestamp: number;
}

let cache: CacheItem | null = null;

export async function loadTemplates(): Promise<Template[]> {
  try {
    // Check cache first
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      return cache.data;
    }

    // Fetch from Google Sheets
    const timestamp = new Date().getTime();
    const urlWithCache = `${SHEET_URL}&timestamp=${timestamp}`;
    
    const response = await fetch(urlWithCache, {
      cache: 'no-store',
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    
    const { data, errors } = Papa.parse(csvText, { 
      header: true,
      skipEmptyLines: true,
      transform: (value) => {
        if (value.toLowerCase() === 'true') return true;
        if (value.toLowerCase() === 'false') return false;
        return value;
      }
    });

    if (errors.length > 0) {
      console.error('CSV parsing errors:', errors);
      throw new Error('CSV parsing failed');
    }

    if (!data || data.length === 0) {
      throw new Error('No data received from Google Sheet');
    }

    const templates = data.map((item: any) => ({
      id: parseInt(item.id),
      name: item.name,
      categories: item.categories.split(',').map((cat: string) => cat.trim()),
      description: item.description,
      overview: item.overview,
      features: item.features ? item.features.split('|').map((f: string) => f.trim()) : [],
      price: item.price,
      isPaid: item.isPaid === 'true',
      hasFreeVersion: item.hasFreeVersion === 'true',
      image: item.image,
      freeVersionUrl: item.freeVersionUrl,
      previewUrl: item.previewUrl,
      buyUrl: item.buyUrl,
      tutorialUrl: item.tutorialUrl
    }));

    // Update cache
    cache = {
      data: templates,
      timestamp: Date.now()
    };

    return templates;

  } catch (error) {
    console.error("Error loading from Google Sheets:", error);
    
    try {
      // Try loading from fallback CSV
      const response = await fetch(FALLBACK_URL);
      const csvText = await response.text();
      const { data } = Papa.parse(csvText, { 
        header: true,
        skipEmptyLines: true 
      });
      
      return data.map((item: any) => ({
        // ... same mapping as above ...
        id: parseInt(item.id),
        name: item.name,
        categories: item.categories.split(',').map((cat: string) => cat.trim()),
        description: item.description,
        overview: item.overview,
        features: item.features ? item.features.split('|').map((f: string) => f.trim()) : [],
        price: item.price,
        isPaid: item.isPaid === 'true',
        hasFreeVersion: item.hasFreeVersion === 'true',
        image: item.image,
        freeVersionUrl: item.freeVersionUrl,
        previewUrl: item.previewUrl,
        buyUrl: item.buyUrl,
        tutorialUrl: item.tutorialUrl
      }));
    } catch (fallbackError) {
      console.error("Error loading fallback:", fallbackError);
      return [];
    }
  }
}