import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth';
import { CourseSchema, LessonSchema } from '../../types/api';

const router = express.Router();
const prisma = new PrismaClient();

// Get all courses
router.get('/', auth, async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        lessons: true,
        category: true
      }
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get course by id
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        lessons: {
          orderBy: { order: 'asc' }
        },
        category: true
      }
    });
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// Create course
router.post('/', auth, async (req, res) => {
  try {
    const data = CourseSchema.parse(req.body);
    const course = await prisma.course.create({
      data: {
        ...data,
        category: {
          connect: { id: data.category }
        }
      },
      include: {
        category: true
      }
    });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Update course
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const data = CourseSchema.parse(req.body);
    
    const course = await prisma.course.update({
      where: { id },
      data: {
        ...data,
        category: {
          connect: { id: data.category }
        }
      },
      include: {
        category: true
      }
    });
    
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// Delete course
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.course.delete({
      where: { id }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

// Add lesson to course
router.post('/:id/lessons', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const data = LessonSchema.parse(req.body);
    
    const lesson = await prisma.lesson.create({
      data: {
        ...data,
        course: {
          connect: { id }
        }
      }
    });
    
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add lesson' });
  }
});

// Update lesson progress
router.post('/:courseId/lessons/:lessonId/progress', auth, async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const userId = (req as any).user.id;
    const { completed, watchTime, lastPosition } = req.body;

    let progress = await prisma.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      }
    });

    if (!progress) {
      progress = await prisma.courseProgress.create({
        data: {
          userId,
          courseId,
          status: 'in_progress'
        }
      });
    }

    const lessonProgress = await prisma.lessonProgress.upsert({
      where: {
        progressId_lessonId: {
          progressId: progress.id,
          lessonId
        }
      },
      update: {
        completed,
        watchTime,
        lastPosition,
        completedAt: completed ? new Date() : null
      },
      create: {
        progressId: progress.id,
        lessonId,
        completed,
        watchTime,
        lastPosition,
        completedAt: completed ? new Date() : null
      }
    });

    res.json(lessonProgress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update lesson progress' });
  }
});

export default router;