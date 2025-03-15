import Papa from 'papaparse';
import type { Template } from '@/app/types/template';
import { templateCache } from './cache';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSjtzEuoELVWkFDCZ0vBsutQq5bVGoha5Valcxga9-c0DXqFdNr8fg0hI5KexsDrIigdZrerGQzDvfP/pub?gid=0&single=true&output=csv';
const FALLBACK_URL = '/data/fallback-templates.csv';
const TIMEOUT_MS = 3000; // 3 second timeout

// Event to notify subscribers when data changes
const templateUpdateEvents = new Set<(templates: Template[]) => void>();

function parseTemplateData(item: Record<string, any>): Template {
  try {
    return {
      id: parseInt(item.id) || 0,
      name: item.name || 'Unnamed Template',
      categories: item.categories ? item.categories.split(',').map((cat: string) => cat.trim()) : [],
      description: item.description || '',
      overview: item.overview || '',
      features: item.features ? item.features.split('|').map((f: string) => f.trim()) : [],
      price: item.price || 'Free',
      isPaid: item.isPaid === 'true',
      hasFreeVersion: item.hasFreeVersion === 'true',
      image: item.image || '/default-template.png',
      freeVersionUrl: item.freeVersionUrl || '',
      previewUrl: item.previewUrl || '',
      buyUrl: item.buyUrl || '',
      tutorialUrl: item.tutorialUrl || ''
    };
  } catch (error) {
    console.error("Error parsing template data:", error, item);
    return {
      id: 0,
      name: 'Error Template',
      categories: ['error'],
      description: 'There was an error loading this template',
      overview: '',
      features: [],
      price: 'N/A',
      isPaid: false,
      hasFreeVersion: false,
      image: '/error-template.png',
      freeVersionUrl: '',
      previewUrl: '',
      buyUrl: '',
      tutorialUrl: ''
    };
  }
}

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
  
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
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timed out after ${TIMEOUT_MS}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Flag to prevent multiple simultaneous background fetches
let isFetchingInBackground = false;

// Function to fetch and process templates
async function fetchAndProcessTemplates(url: string, isFallback = false): Promise<Template[]> {
  try {
    const response = await fetchWithTimeout(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    
    if (!csvText || csvText.trim().length === 0) {
      throw new Error('Empty CSV response');
    }
    
    const { data, errors } = Papa.parse(csvText, { 
      header: true,
      skipEmptyLines: true,
    });

    if (errors.length > 0 && errors[0].code !== "TooFewFields") {
      console.warn("CSV parsing had errors:", errors);
    }

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('No valid data in CSV');
    }

    const templates = data.map(parseTemplateData).filter(Boolean);
    
    if (templates.length > 0) {
      templateCache.set(templates);
      // Notify subscribers of new data
      templateUpdateEvents.forEach(callback => callback(templates));
    }
    
    return templates;
  } catch (error) {
    if (!isFallback) {
      console.error("Error in fetchAndProcessTemplates:", error);
      // Try fallback if primary source fails
      return fetchAndProcessTemplates(FALLBACK_URL, true);
    }
    throw error;
  }
}

// Main function to load templates with stale-while-revalidate pattern
export async function loadTemplates(): Promise<Template[]> {
  // First, try to get from cache
  const cachedTemplates = templateCache.get();
  
  if (cachedTemplates && cachedTemplates.length > 0) {
    // If we have cache, use it immediately but refresh in background
    if (!isFetchingInBackground) {
      isFetchingInBackground = true;
      
      // Start background fetch to update cache
      setTimeout(async () => {
        try {
          await fetchAndProcessTemplates(SHEET_URL);
        } catch (error) {
          console.error("Background fetch failed:", error);
        } finally {
          isFetchingInBackground = false;
        }
      }, 100);
    }
    
    return cachedTemplates;
  }
  
  // No cache, do a blocking fetch
  try {
    return await fetchAndProcessTemplates(SHEET_URL);
  } catch (error) {
    console.error("All template sources failed:", error);
    return []; // Return empty array as last resort
  }
}

// Function to subscribe to template updates
export function subscribeToTemplateUpdates(callback: (templates: Template[]) => void): () => void {
  templateUpdateEvents.add(callback);
  
  // Return unsubscribe function
  return () => {
    templateUpdateEvents.delete(callback);
  };
}