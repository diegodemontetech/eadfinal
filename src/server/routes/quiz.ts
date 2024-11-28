import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth';
import { QuizSchema, QuizSubmissionSchema } from '../../types/api';

const router = express.Router();
const prisma = new PrismaClient();

// Get quiz by lesson id
router.get('/lesson/:lessonId', auth, async (req, res) => {
  try {
    const { lessonId } = req.params;
    const quiz = await prisma.quiz.findUnique({
      where: { lessonId }
    });
    
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

// Create quiz
router.post('/', auth, async (req, res) => {
  try {
    const data = QuizSchema.parse(req.body);
    const quiz = await prisma.quiz.create({
      data: {
        questions: JSON.stringify(data.questions),
        passingScore: data.passingScore,
        lesson: {
          connect: { id: data.lessonId }
        }
      }
    });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create quiz' });
  }
});

// Submit quiz answers
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const data = QuizSubmissionSchema.parse(req.body);

    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        lesson: {
          include: {
            course: true
          }
        }
      }
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const questions = JSON.parse(quiz.questions);
    const correctAnswers = data.answers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);

    const grade = (correctAnswers / questions.length) * 100;
    const passed = grade >= quiz.passingScore;

    if (passed) {
      await prisma.courseProgress.update({
        where: {
          userId_courseId: {
            userId,
            courseId: quiz.lesson.courseId
          }
        },
        data: {
          grade,
          status: 'completed',
          completedAt: new Date()
        }
      });

      await prisma.certificate.create({
        data: {
          userId,
          courseId: quiz.lesson.courseId,
          grade
        }
      });
    }

    res.json({ grade, passed });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
});

export default router;