'use client';

import { useState, useEffect } from 'react';
import { loadTemplates, subscribeToTemplateUpdates } from '../utils/loadTemplates';
import type { Template } from '../types/template';

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchData() {
      try {
        // This will return cached data immediately if available
        const data = await loadTemplates();
        
        if (isMounted) {
          setTemplates(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to load templates:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    fetchData();
    
    // Subscribe to template updates (will receive updates from background refresh)
    const unsubscribe = subscribeToTemplateUpdates((newTemplates) => {
      if (isMounted) {
        setTemplates(newTemplates);
      }
    });
    
    // Cleanup subscription on unmount
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return { templates, loading };
}