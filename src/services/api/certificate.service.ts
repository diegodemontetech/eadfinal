import { supabase } from './config';
import { handleError, handleResponse } from './config';

export const certificateService = {
  async getUserCertificates() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('certificates')
        .select(`
          *,
          course:courses(
            id,
            title,
            thumbnail,
            instructor
          )
        `)
        .eq('user_id', user.id)
        .order('issued_at', { ascending: false });

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  },

  async getCertificateById(id: string) {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select(`
          *,
          course:courses(*),
          user:users(
            id,
            name,
            email
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

  async createCertificate(courseId: string, grade: number) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('certificates')
        .insert([{
          user_id: user.id,
          course_id: courseId,
          grade
        }])
        .select()
        .single();

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  },

  async getUserProgress() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data: certificates, error: certificatesError } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', user.id);

      if (certificatesError) throw certificatesError;

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('total_hours, average_grade')
        .eq('id', user.id)
        .single();

      if (userError) throw userError;

      return {
        totalCertificates: certificates?.length || 0,
        totalHours: userData?.total_hours || 0,
        averageGrade: userData?.average_grade || 0
      };
    } catch (error) {
      return handleError(error);
    }
  }
};