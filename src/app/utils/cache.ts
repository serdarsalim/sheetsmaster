import type { Template } from '@/app/types/template';



const CACHE_KEY = 'templates';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheItem {
  data: Template[];
  timestamp: number;
}

const isClient = typeof window !== 'undefined';

export const templateCache = {
  set: (data: Template[]) => {
    if (!isClient) return;
    
    const cacheItem: CacheItem = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheItem));
  },

  get: (): Template[] | null => {
    if (!isClient) return null;

    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  }
};