export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  group?: {
    name: string;
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
  instructor: string;
  rating: number;
  status: 'draft' | 'published' | 'archived';
  isFeatured: boolean;
  progress?: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
  attachments?: {
    name: string;
    url: string;
  }[];
}

export interface Ebook {
  id: string;
  title: string;
  description: string;
  author: string;
  thumbnail: string;
  fileUrl: string;
  pages: number;
  readTime: string;
  category: string;
  rating: number;
  totalRatings: number;
  publishDate: string;
}

export interface News {
  id: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
}

export interface CertificateLevel {
  id: string;
  name: string;
  description: string;
  minCertificates: number;
  maxCertificates: number;
  icon: string;
  color: string;
}

export interface Certificate {
  id: string;
  grade: number;
  issuedAt: string;
  course: {
    id: string;
    title: string;
    thumbnail: string;
    instructor: string;
  };
}