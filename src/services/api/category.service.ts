import { supabase } from './config';
import { handleError, handleResponse } from './config';

export const categoryService = {
  async getAllCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  },

  async createCategory(categoryData: { name: string; description: string }) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([categoryData])
        .select()
        .single();

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  },

  async updateCategory(id: string, categoryData: { name?: string; description?: string; isActive?: boolean }) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update(categoryData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  },

  async deleteCategory(id: string) {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      return handleError(error);
    }
  }
};