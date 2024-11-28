import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Courses
export const courseService = {
  async getAllCourses() {
    const response = await api.get('/courses');
    return response.data;
  },

  async getCourseById(id: string) {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  async getFeaturedCourses() {
    const response = await api.get('/courses/featured');
    return response.data;
  },

  async completeLesson(courseId: string, lessonId: string) {
    const response = await api.post(`/courses/${courseId}/lessons/${lessonId}/complete`);
    return response.data;
  },

  async submitQuiz(courseId: string, quizId: string, answers: Record<string, number>) {
    const response = await api.post(`/courses/${courseId}/quiz/${quizId}/submit`, { answers });
    return response.data;
  },
};

// Users and Authentication
export const authService = {
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(data: { name: string; email: string; password: string }) {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
};

export const userService = {
  async getProfile() {
    const response = await api.get('/users/profile');
    return response.data;
  },

  async updateProfile(data: any) {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  async getUserGroups() {
    const response = await api.get('/users/groups');
    return response.data;
  },
};

// News and Comments
export const newsService = {
  async getAllNews() {
    const response = await api.get('/news');
    return response.data;
  },

  async getNewsById(id: string) {
    const response = await api.get(`/news/${id}`);
    return response.data;
  },

  async addComment(newsId: string, content: string) {
    const response = await api.post(`/news/${newsId}/comments`, { content });
    return response.data;
  },

  async likeNews(newsId: string) {
    const response = await api.post(`/news/${newsId}/like`);
    return response.data;
  },
};

// Categories
export const categoryService = {
  async getAllCategories() {
    const response = await api.get('/categories');
    return response.data;
  },
};

// E-books
export const ebookService = {
  async getAllEbooks() {
    const response = await api.get('/ebooks');
    return response.data;
  },

  async getEbookById(id: string) {
    const response = await api.get(`/ebooks/${id}`);
    return response.data;
  },

  async updateReadingProgress(ebookId: string, data: { currentPage: number; completed: boolean }) {
    const response = await api.post(`/ebooks/${ebookId}/progress`, data);
    return response.data;
  },
};

// Certificates
export const certificateService = {
  async getUserCertificates() {
    const response = await api.get('/certificates');
    return response.data;
  },

  async getCertificateById(id: string) {
    const response = await api.get(`/certificates/${id}`);
    return response.data;
  },

  async downloadCertificate(id: string) {
    const response = await api.get(`/certificates/${id}/download`, { responseType: 'blob' });
    return response.data;
  },
};

// Quiz
export const quizService = {
  async getQuizByLessonId(lessonId: string) {
    const response = await api.get(`/quiz/lesson/${lessonId}`);
    return response.data;
  },

  async submitQuizAnswers(quizId: string, answers: number[]) {
    const response = await api.post(`/quiz/${quizId}/submit`, { answers });
    return response.data;
  },
};

// User Groups
export const groupService = {
  async getAllGroups() {
    const response = await api.get('/groups');
    return response.data;
  },

  async createGroup(data: { name: string; permissions: string[]; courseIds: string[] }) {
    const response = await api.post('/groups', data);
    return response.data;
  },

  async updateGroup(id: string, data: { name: string; permissions: string[]; courseIds: string[] }) {
    const response = await api.put(`/groups/${id}`, data);
    return response.data;
  },

  async deleteGroup(id: string) {
    const response = await api.delete(`/groups/${id}`);
    return response.data;
  },
};

export default api;