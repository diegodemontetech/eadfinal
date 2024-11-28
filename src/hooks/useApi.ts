import { useState, useCallback } from 'react';
import { supabase } from '../lib/api';
import { useToast } from '../hooks/useToast';

export function useApi<T = any>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const request = useCallback(async (endpoint: string, options?: any) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.from(endpoint).select(options?.select || '*');
      
      if (error) throw error;
      setData(data);
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      showToast('error', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const mutate = useCallback(async (
    endpoint: string,
    method: 'POST' | 'PUT' | 'DELETE' = 'POST',
    data?: any
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      let result;
      switch (method) {
        case 'POST':
          result = await supabase.from(endpoint).insert(data).select().single();
          break;
        case 'PUT':
          result = await supabase.from(endpoint).update(data).select().single();
          break;
        case 'DELETE':
          result = await supabase.from(endpoint).delete();
          break;
      }

      if (result?.error) throw result.error;
      return result?.data;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      showToast('error', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  return {
    data,
    error,
    loading,
    request,
    mutate
  };
}