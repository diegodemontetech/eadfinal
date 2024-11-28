import { storage, getPublicUrl } from '../../lib/supabase';
import { handleError } from './config';

export const storageService = {
  async uploadVideo(file: File, path: string) {
    try {
      const { error } = await storage.videos.upload(path, file);
      if (error) throw error;
      return getPublicUrl('videos', path);
    } catch (error) {
      return handleError(error);
    }
  },

  async uploadPdf(file: File, path: string) {
    try {
      const { error } = await storage.pdfs.upload(path, file);
      if (error) throw error;
      return getPublicUrl('pdfs', path);
    } catch (error) {
      return handleError(error);
    }
  },

  async uploadImage(file: File, path: string) {
    try {
      const { error } = await storage.images.upload(path, file);
      if (error) throw error;
      return getPublicUrl('images', path);
    } catch (error) {
      return handleError(error);
    }
  },

  async removeFile(bucket: 'videos' | 'pdfs' | 'images', path: string) {
    try {
      const { error } = await storage[bucket].remove([path]);
      if (error) throw error;
    } catch (error) {
      return handleError(error);
    }
  }
};