import Papa from 'papaparse';
import type { Template } from '@/app/types/template';
import { templateCache } from './cache';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSjtzEuoELVWkFDCZ0vBsutQq5bVGoha5Valcxga9-c0DXqFdNr8fg0hI5KexsDrIigdZrerGQzDvfP/pub?gid=0&single=true&output=csv';
const FALLBACK_URL = '/data/fallback-templates.csv';
const TIMEOUT_MS = 3000; // 3 second timeout

function parseTemplateData(item: Record<string, any>): Template {
  return {
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
  };
}

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      cache: 'no-store',
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

export async function loadTemplates(): Promise<Template[]> {
  try {
    // Check cache first
    const cached = templateCache.get();
    if (cached) return cached;

    // Try Google Sheets with timeout
    const response = await fetchWithTimeout(SHEET_URL);
    
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
      throw new Error('CSV parsing failed');
    }

    const templates = data.map(parseTemplateData);
    templateCache.set(templates);
    return templates;

  } catch (error) {
    console.error("Error loading from Google Sheets, trying fallback:", error);
    
    try {
      const response = await fetch(FALLBACK_URL);
      const csvText = await response.text();
      const { data } = Papa.parse(csvText, { 
        header: true,
        skipEmptyLines: true 
      });
      
      const templates = data.map(parseTemplateData);
      templateCache.set(templates);
      return templates;
    } catch (fallbackError) {
      console.error("Error loading fallback:", fallbackError);
      return [];
    }
  }
}