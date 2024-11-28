import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const storage = {
  videos: supabase.storage.from('videos'),
  pdfs: supabase.storage.from('pdfs'),
  images: supabase.storage.from('images')
};

export const getPublicUrl = (bucket: 'videos' | 'pdfs' | 'images', path: string) => {
  const { data } = storage[bucket].getPublicUrl(path);
  return data.publicUrl;
};