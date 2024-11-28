```typescript
import { useState } from 'react';
import api from '../services/api';

export const useSettings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCourse = async (courseData: any) => {
    try {
      setLoading(true);
      const response = await api.post('/settings/courses', courseData);
      return response.data;
    } catch (err) {
      setError('Failed to create course');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createLesson = async (lessonData: any) => {
    try {
      setLoading(true);
      const response = await api.post('/settings/lessons', lessonData);
      return response.data;
    } catch (err) {
      setError('Failed to create lesson');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createQuiz = async (quizData: any) => {
    try {
      setLoading(true);
      const response = await api.post('/settings/quiz', quizData);
      return response.data;
    } catch (err) {
      setError('Failed to create quiz');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData: any) => {
    try {
      setLoading(true);
      const response = await api.post('/settings/categories', categoryData);
      return response.data;
    } catch (err) {
      setError('Failed to create category');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createUserGroup = async (groupData: any) => {
    try {
      setLoading(true);
      const response = await api.post('/settings/user-groups', groupData);
      return response.data;
    } catch (err) {
      setError('Failed to create user group');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createCourse,
    createLesson,
    createQuiz,
    createCategory,
    createUserGroup
  };
};
```