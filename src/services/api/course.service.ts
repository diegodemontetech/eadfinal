import { supabase } from './config';
import { handleError, handleResponse } from './config';
import type { Course, Lesson } from '../../types';

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

  async getCourseById(id: string) {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          category:categories(*),
          lessons(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  },

  async createCourse(courseData: Partial<Course>) {
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert([courseData])
        .select()
        .single();

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  },

  async updateCourse(id: string, courseData: Partial<Course>) {
    try {
      const { data, error } = await supabase
        .from('courses')
        .update(courseData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  },

  async deleteCourse(id: string) {
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      return handleError(error);
    }
  },

  async createLesson(courseId: string, lessonData: Partial<Lesson>) {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .insert([{ ...lessonData, course_id: courseId }])
        .select()
        .single();

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  }
};