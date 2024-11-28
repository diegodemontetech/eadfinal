```typescript
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { auth } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Course Management
router.post('/courses', auth, async (req, res) => {
  const courseSchema = z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    duration: z.string(),
    instructor: z.string(),
    category: z.string(),
    isFeaturedMain: z.boolean(),
    isFeaturedCarousel: z.boolean()
  });

  try {
    const data = courseSchema.parse(req.body);
    const course = await prisma.course.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
    res.json(course);
  } catch (error) {
    res.status(400).json({ error: 'Invalid course data' });
  }
});

// Lesson Management
router.post('/lessons', auth, async (req, res) => {
  const lessonSchema = z.object({
    courseId: z.string(),
    title: z.string(),
    description: z.string(),
    duration: z.string(),
    videoUrl: z.string(),
    order: z.number()
  });

  try {
    const data = lessonSchema.parse(req.body);
    const lesson = await prisma.lesson.create({
      data: {
        ...data,
        course: { connect: { id: data.courseId } }
      }
    });
    res.json(lesson);
  } catch (error) {
    res.status(400).json({ error: 'Invalid lesson data' });
  }
});

// Quiz Management
router.post('/quiz', auth, async (req, res) => {
  const quizSchema = z.object({
    lessonId: z.string(),
    questions: z.array(z.object({
      text: z.string(),
      options: z.array(z.string()),
      correctAnswer: z.number()
    }))
  });

  try {
    const data = quizSchema.parse(req.body);
    // Store quiz data (you'll need to add Quiz model to schema)
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Invalid quiz data' });
  }
});

// Category Management
router.post('/categories', auth, async (req, res) => {
  const categorySchema = z.object({
    name: z.string(),
    description: z.string(),
    isActive: z.boolean(),
    usedIn: z.object({
      courses: z.boolean(),
      ebooks: z.boolean()
    })
  });

  try {
    const data = categorySchema.parse(req.body);
    // Store category data (you'll need to add Category model to schema)
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Invalid category data' });
  }
});

// User Group Management
router.post('/user-groups', auth, async (req, res) => {
  const groupSchema = z.object({
    name: z.string(),
    permissions: z.array(z.string()),
    courses: z.array(z.string())
  });

  try {
    const data = groupSchema.parse(req.body);
    // Store user group data (you'll need to add UserGroup model to schema)
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Invalid user group data' });
  }
});

export default router;
```