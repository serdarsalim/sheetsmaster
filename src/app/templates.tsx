import { useEffect, useState } from "react";
import Papa from 'papaparse';


export interface Template {
  id: number;
  name: string;
  categories: string[];
  description: string;
  overview?: string;
  features?: string[];
  price: string;
  isPaid: boolean;
  freeVersion: boolean;
  image: string;
  freeVersionUrl?: string;
  previewUrl?: string;
  buyUrl?: string;
  tutorialUrl?: string;
}

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSjtzEuoELVWkFDCZ0vBsutQq5bVGoha5Valcxga9-c0DXqFdNr8fg0hI5KexsDrIigdZrerGQzDvfP/pub?gid=0&single=true&output=csv';
const FALLBACK_URL = '/data/fallbackTemplates.csv';

export async function loadTemplates(): Promise<Template[]> {
  try {
    // Try Google Sheets first
    const timestamp = new Date().getTime();
    const urlWithCache = `${SHEET_URL}&timestamp=${timestamp}`;
    
    console.log('Fetching from Google Sheets:', urlWithCache);
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
      skipEmptyLines: true
    });

    if (errors.length > 0) {
      throw new Error('CSV parsing failed');
    }

    return parseTemplates(data);

  } catch (error) {
    console.error("Error loading from Google Sheets:", error);
    console.log("Falling back to local CSV...");
    
    // Try loading from fallback CSV
    try {
      const response = await fetch(FALLBACK_URL);
      const csvText = await response.text();
      const { data } = Papa.parse(csvText, { 
        header: true,
        skipEmptyLines: true 
      });
      
      return parseTemplates(data);
    } catch (fallbackError) {
      console.error("Error loading fallback:", fallbackError);
      return [];
    }
  }
}

// Helper function to parse template data
function parseTemplates(data: any[]): Template[] {
  return data.map(item => ({
    id: parseInt(item.id),
    name: item.name,
    categories: item.categories.split(',').map((cat: string) => cat.trim()),
    description: item.description,
    overview: item.overview,
    features: item.features ? item.features.split('|').map((f: string) => f.trim()) : [],
    price: item.price,
    isPaid: item.isPaid === 'true',
    freeVersion: item.freeVersion === 'true',
    image: item.image,
    freeVersionUrl: item.freeVersionUrl,
    previewUrl: item.previewUrl,
    buyUrl: item.buyUrl,
    tutorialUrl: item.tutorialUrl
  }));
}

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await loadTemplates();
      setTemplates(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return { templates, loading };
}


export default useTemplates;
