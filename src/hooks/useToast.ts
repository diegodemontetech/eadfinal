import { useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  type: ToastType;
  message: string;
}

export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback((type: ToastType, message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }, []);

  return {
    toast,
    showToast
  };
}