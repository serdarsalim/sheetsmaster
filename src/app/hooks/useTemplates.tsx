'use client';

import { useState, useEffect } from 'react';
import { loadTemplates, subscribeToTemplateUpdates, getTemplateById } from '../utils/loadTemplates';
import type { Template } from '../types/template';

// Standard hook for template list
export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchData() {
      try {
        // Will only return templates with loadTemplate: true
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
    
    // Subscribe to template updates (will receive only loadable templates)
    const unsubscribe = subscribeToTemplateUpdates((newTemplates) => {
      if (isMounted) {
        setTemplates(newTemplates);
      }
    });
    
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return { templates, loading };
}

// Add a hook for single template by ID
export function useTemplateById(id: number) {
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchTemplate() {
      try {
        const data = await getTemplateById(id);
        
        if (isMounted) {
          setTemplate(data);
          setLoading(false);
        }
      } catch (err) {
        console.error(`Failed to load template #${id}:`, err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
          setLoading(false);
        }
      }
    }
    
    fetchTemplate();
    
    return () => {
      isMounted = false;
    };
  }, [id]);

  return { template, loading, error };
}