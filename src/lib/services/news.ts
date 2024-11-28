import { supabase, handleError, handleResponse } from '../api';
import type { News } from '../../types';

export const newsService = {
  async getLatestNews(limit: number = 3) {
    try {
      const { data, error } = await supabase
        .from('news')
        .select(`
          *,
          author:users(id, name, avatar_url)
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  }
};