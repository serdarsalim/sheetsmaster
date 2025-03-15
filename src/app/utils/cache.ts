import type { Template } from '@/app/types/template';

const CACHE_KEY = 'templates';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheItem {
  data: Template[];
  timestamp: number;
}

const isClient = typeof window !== 'undefined';

export const templateCache = {
  set: (data: Template[]): void => {
    if (!isClient || !Array.isArray(data)) return;
    
    try {
      const cacheItem: CacheItem = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheItem));
    } catch (error) {
      console.error('Failed to cache templates:', error);
      // Attempt to clear cache if setting fails
      try {
        localStorage.removeItem(CACHE_KEY);
      } catch (e) {
        // Silent fail - nothing more we can do
      }
    }
  },

  get: (): Template[] | null => {
    if (!isClient) return null;

    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const parsed = JSON.parse(cached);
      
      // Validate structure of cached data
      if (!parsed || 
          typeof parsed !== 'object' || 
          !Array.isArray(parsed.data) || 
          typeof parsed.timestamp !== 'number') {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      const { data, timestamp } = parsed as CacheItem;
      
      // Check if cache is expired
      if (Date.now() - timestamp > CACHE_DURATION) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Failed to retrieve cached templates:', error);
      // Attempt to clear corrupt cache
      try {
        localStorage.removeItem(CACHE_KEY);
      } catch (e) {
        // Silent fail
      }
      return null;
    }
  }
};