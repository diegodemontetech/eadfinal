import { supabase, handleError, handleResponse } from '../api';

export const userService = {
  async getProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          groups:user_groups(*)
        `)
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  },

  async updateProfile(userData: { name?: string; avatar_url?: string }) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      return handleResponse(data);
    } catch (error) {
      return handleError(error);
    }
  }
};