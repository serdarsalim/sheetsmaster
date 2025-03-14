import Papa from 'papaparse';
import { Template, fallbackTemplates } from '@/app/templates';

export async function loadTemplates(): Promise<Template[]> {
  try {
    const response = await fetch('/data/templates.csv');
    const csvText = await response.text();
    
    const { data } = Papa.parse(csvText, { 
      header: true,
      skipEmptyLines: true
    });
    
    return data.map((item: any) => ({
      id: parseInt(item.id),
      name: item.name,
      price: item.price,
      categories: item.categories.split(',').map((cat: string) => cat.trim()),
      description: item.description,
      image: item.image,
      hasFreeVersion: item.hasFreeVersion === "true" ? true : false,
      isPaid: item.isPaid === "true" ? true : false,
      previewUrl: item.previewUrl || undefined,
      buyUrl: item.buyUrl || undefined,
      freeVersionUrl: item.freeVersionUrl || undefined,
      tutorialUrl: item.tutorialUrl || undefined,
      overview: item.overview || undefined,
      features: item.features ? item.features.split('|').map((feat: string) => feat.trim()) : undefined,
    }));
} catch (error) {
    console.error("Error loading templates:", error);
    return fallbackTemplates; // Return fallback templates instead of empty array
  }
}