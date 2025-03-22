import Papa from 'papaparse';
import type { Template } from '@/app/types/template';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSjtzEuoELVWkFDCZ0vBsutQq5bVGoha5Valcxga9-c0DXqFdNr8fg0hI5KexsDrIigdZrerGQzDvfP/pub?gid=0&single=true&output=csv';
const FALLBACK_URL = '/data/fallbackTemplates.csv';

// This function will be called on the server
export async function getTemplates(): Promise<Template[]> {
  try {
    // Add cache control for production
    const options = process.env.NODE_ENV === 'production' 
      ? { next: { revalidate: 3600 } } // Revalidate every hour in production
      : { cache: 'no-store' }; // No caching in development
    
    const timestamp = new Date().getTime();
    const urlWithCache = `${SHEET_URL}&timestamp=${timestamp}`;
    
    // Use native fetch (works in Node.js environment within Next.js)
    const response = await fetch(urlWithCache, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    
    // Parse the CSV text into JavaScript objects
    // Note: This will run on the server where Papa.parse is just a function
    const parsed = Papa.parse(csvText, { 
      header: true,
      skipEmptyLines: true
    });
    
    if (parsed.errors.length > 0 && parsed.errors[0].code !== "TooFewFields") {
      console.warn("CSV parsing had errors:", parsed.errors);
    }

    // Convert the data to our Template type
    const templates = parsed.data.map((item: any) => parseTemplateData(item));
    
    // Return only templates that are marked to load
    return templates.filter(template => template.load);

  } catch (error) {
    console.error("Error loading from Google Sheets:", error);
    
    try {
      // Fallback to local CSV file
      const response = await fetch(FALLBACK_URL);
      const csvText = await response.text();
      
      const parsed = Papa.parse(csvText, { 
        header: true,
        skipEmptyLines: true 
      });
      
      const templates = parsed.data.map((item: any) => parseTemplateData(item));
      return templates.filter(template => template.load);
    } catch (fallbackError) {
      console.error("Error loading fallback:", fallbackError);
      return [];
    }
  }
}

// Helper function to parse template data into the proper format
function parseTemplateData(item: Record<string, any>): Template {
  try {
    // Parse loadTemplate first for optimization
    const load = item.load === 'TRUE' || 
                 item.load === 'true' || 
                 item.load === true;
    
    return {
      load,
      id: parseInt(item.id) || 0,
      name: item.name || 'Unnamed Template',
      categories: item.categories ? item.categories.split(',').map((cat: string) => cat.trim()) : [],
      description: item.description || '',
      overview: item.overview || '',
      features: item.features ? item.features.split('|').map((f: string) => f.trim()) : [],
      price: item.price || 'Free',
      isPaid: item.isPaid === 'TRUE' || item.isPaid === 'true',
      freeVersion: item.freeVersion === 'TRUE' || item.freeVersion === 'true',
      image: item.image || '/default-template.png',
      freeUrl: item.freeUrl || '',
      previewUrl: item.previewUrl || '',
      buyUrl: item.buyUrl || '',
      tutorialUrl: item.tutorialUrl || ''
    };
  } catch (error) {
    console.error("Error parsing template data:", error, item);
    // Return a default error template
    return {
      load: false,
      id: 0,
      name: 'Error Template',
      categories: ['error'],
      description: 'There was an error loading this template',
      overview: '',
      features: [],
      price: 'N/A',
      isPaid: false,
      freeVersion: false,
      image: '/error-template.png',
      freeUrl: '',
      previewUrl: '',
      buyUrl: '',
      tutorialUrl: ''
    };
  }
}