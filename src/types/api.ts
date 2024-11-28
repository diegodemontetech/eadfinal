import { z } from 'zod';

// Auth
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const RegisterSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6)
});

// Courses
export const CourseSchema = z.object({
  title: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  duration: z.string(),
  category: z.string(),
  instructor: z.string(),
  rating: z.number().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  isFeatured: z.boolean()
});

export const LessonSchema = z.object({
  courseId: z.string(),
  title: z.string(),
  description: z.string(),
  duration: z.string(),
  videoUrl: z.string(),
  order: z.number(),
  attachments: z.array(z.object({
    name: z.string(),
    url: z.string()
  })).optional()
});

export const QuizSchema = z.object({
  lessonId: z.string(),
  questions: z.array(z.object({
    text: z.string(),
    options: z.array(z.string()),
    correctAnswer: z.number()
  })),
  passingScore: z.number().min(0).max(100)
});

// Progress
export const LessonProgressSchema = z.object({
  lessonId: z.string(),
  completed: z.boolean(),
  watchTime: z.number(),
  lastPosition: z.number()
});

export const QuizSubmissionSchema = z.object({
  quizId: z.string(),
  answers: z.array(z.number())
});

// Categories
export const CategorySchema = z.object({
  name: z.string(),
  description: z.string(),
  isActive: z.boolean(),
  usedInCourses: z.boolean(),
  usedInEbooks: z.boolean()
});

// User Groups
export const UserGroupSchema = z.object({
  name: z.string(),
  permissions: z.array(z.string()),
  courseIds: z.array(z.string())
});

// E-books
export const EbookSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  category: z.string(),
  thumbnail: z.string(),
  fileUrl: z.string(),
  pages: z.number(),
  readTime: z.string()
});

// News
export const NewsSchema = z.object({
  title: z.string(),
  content: z.string(),
  thumbnail: z.string(),
  category: z.string(),
  author: z.string(),
  isHighlighted: z.boolean(),
  status: z.enum(['draft', 'published', 'archived'])
});

// Comments
export const CommentSchema = z.object({
  content: z.string(),
  parentId: z.string().optional() // For replies
});