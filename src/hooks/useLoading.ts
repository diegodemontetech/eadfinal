import { useState, useCallback } from 'react';

export function useLoading() {
  const [loading, setLoading] = useState(false);

  const withLoading = useCallback(async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
      setLoading(true);
      return await fn();
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    withLoading
  };
}