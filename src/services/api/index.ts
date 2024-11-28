import { supabase, handleError, handleResponse } from './config';

export {
  supabase,
  handleError,
  handleResponse
};

export * from './auth.service';
export * from './course.service';
export * from './category.service';
export * from './certificate.service';
export * from './ebook.service';
export * from './news.service';
export * from './quiz.service';
export * from './storage.service';
export * from './user.service';