import { supabase } from './config';
import { handleError, handleResponse } from './config';
import type { News } from '../../types';

export const newsService = {
  async getAllNews() {
    try {
      const { data, error } = await supabase
        .from('news')
        .select(`
          *,
          author:users(id, name, avatar_url),
          comments(
            *,
            author:users(id, name, avatar_url),
            replies(
              *,
              author:users(id, name, avatar_url)
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  },

  async getNewsById(id: string) {
    try {
      const { data, error } = await supabase
        .from('news')
        .select(`
          *,
          author:users(id, name, avatar_url),
          comments(
            *,
            author:users(id, name, avatar_url),
            replies(
              *,
              author:users(id, name, avatar_url)
            )
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  },

  async createNews(newsData: Partial<News>) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('news')
        .insert([{ ...newsData, author_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  },

  async updateNews(id: string, newsData: Partial<News>) {
    try {
      const { data, error } = await supabase
        .from('news')
        .update(newsData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  },

  async deleteNews(id: string) {
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      return handleError(error);
    }
  },

  async addComment(newsId: string, content: string, parentId?: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('comments')
        .insert([{
          content,
          news_id: newsId,
          author_id: user.id,
          parent_id: parentId
        }])
        .select()
        .single();

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  }
};