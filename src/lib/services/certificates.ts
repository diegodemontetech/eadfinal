import { supabase, handleError, handleResponse } from '../api';

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
  }
};