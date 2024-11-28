import { supabase, handleError, handleResponse } from '../api';
import type { Course } from '../../types';

export const courseService = {
  async getAllCourses() {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          category:categories(*),
          lessons(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  },

  async getFeaturedCourses() {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          category:categories(*),
          lessons(*)
        `)
        .eq('is_featured', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  },

  async getMainFeaturedCourse() {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          category:categories(*),
          lessons(*)
        `)
        .eq('is_featured', true)
        .order('rating', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  }
};