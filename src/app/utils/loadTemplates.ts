import Papa from 'papaparse';
import type { Template } from '@/app/types/template';
import { templateCache } from './cache';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSjtzEuoELVWkFDCZ0vBsutQq5bVGoha5Valcxga9-c0DXqFdNr8fg0hI5KexsDrIigdZrerGQzDvfP/pub?gid=0&single=true&output=csv';
const FALLBACK_URL = '/data/fallback-templates.csv';
const TIMEOUT_MS = 3000; // 3 second timeout

function parseTemplateData(item: Record<string, any>): Template {
  try {
    return {
      id: parseInt(item.id) || 0, // Provide default value if parse fails
      name: item.name || 'Unnamed Template',
      categories: item.categories ? item.categories.split(',').map((cat: string) => cat.trim()) : [],
      description: item.description || '',
      overview: item.overview || '',
      features: item.features ? item.features.split('|').map((f: string) => f.trim()) : [],
      price: item.price || 'Free',
      isPaid: item.isPaid === 'true',
      hasFreeVersion: item.hasFreeVersion === 'true',
      image: item.image || '/default-template.png', // Provide a default image path
      freeVersionUrl: item.freeVersionUrl || '',
      previewUrl: item.previewUrl || '',
      buyUrl: item.buyUrl || '',
      tutorialUrl: item.tutorialUrl || ''
    };
  } catch (error) {
    console.error("Error parsing template data:", error, item);
    // Return a minimal valid template instead of throwing
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
    // Rethrow with more information if it's an abort error
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timed out after ${TIMEOUT_MS}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function loadTemplates(): Promise<Template[]> {
  try {
    // Check cache first
    const cached = templateCache.get();
    if (cached && Array.isArray(cached) && cached.length > 0) {
      return cached;
    }

    // Try Google Sheets with timeout
    let response;
    try {
      response = await fetchWithTimeout(SHEET_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (fetchError) {
      console.error("Error fetching from Google Sheets:", fetchError);
      throw fetchError; // Let the outer catch handle fallback
    }
    
    const csvText = await response.text();
    
    // Add validation to ensure we got actual CSV data
    if (!csvText || csvText.trim().length === 0) {
      throw new Error('Empty CSV response');
    }
    
    const { data, errors } = Papa.parse(csvText, { 
      header: true,
      skipEmptyLines: true,
      // Remove the transform function as it's better to handle in parseTemplateData
    });

    if (errors.length > 0 && errors[0].code !== "TooFewFields") {
      // TooFewFields often happens with empty lines, which we skip anyway
      console.warn("CSV parsing had errors:", errors);
    }

    // Check that data is an array and has at least one item
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('No valid data in CSV');
    }

    const templates = data.map(parseTemplateData).filter(Boolean);
    
    // Only cache if we got at least one valid template
    if (templates.length > 0) {
      templateCache.set(templates);
    }
    
    return templates;

  } catch (error) {
    console.error("Error loading from Google Sheets, trying fallback:", error);
    
    try {
      const response = await fetch(FALLBACK_URL);
      
      if (!response.ok) {
        throw new Error(`Fallback HTTP error! status: ${response.status}`);
      }
      
      const csvText = await response.text();
      
      if (!csvText || csvText.trim().length === 0) {
        throw new Error('Empty fallback CSV response');
      }
      
      const { data } = Papa.parse(csvText, { 
        header: true,
        skipEmptyLines: true 
      });
      
      // Validate data
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No valid data in fallback CSV');
      }
      
      const templates = data.map(parseTemplateData).filter(Boolean);
      
      if (templates.length > 0) {
        templateCache.set(templates);
      }
      
      return templates;
    } catch (fallbackError) {
      console.error("Error loading fallback:", fallbackError);
      return []; // Return empty array as last resort
    }
  }
}