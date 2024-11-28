import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const handleError = (error: any) => {
  console.error('API Error:', error);
  throw new Error(error.message || 'An unexpected error occurred');
};

export const handleResponse = <T>(data: T) => {
  if (!data) {
    throw new Error('No data returned from the API');
  }
  return data;
};