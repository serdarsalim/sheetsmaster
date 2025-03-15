'use client';

import { useState, useEffect } from 'react';
import { loadTemplates } from '../utils/loadTemplates';

export function useTemplates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await loadTemplates();
        setTemplates(data);
      } catch (error) {
        console.error("Failed to load templates:", error);
        setTemplates([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  return { templates, loading };
}