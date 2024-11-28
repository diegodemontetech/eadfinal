import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get user profile with stats
router.get('/profile', auth, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        courseProgress: {
          include: {
            course: true,
            lessons: true
          }
        },
        certificates: {
          include: {
            course: true
          }
        },
        groups: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Get user's course progress
router.get('/progress', auth, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const progress = await prisma.courseProgress.findMany({
      where: { userId },
      include: {
        course: true,
        lessons: true
      }
    });

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// Get user's certificates
router.get('/certificates', auth, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const certificates = await prisma.certificate.findMany({
      where: { userId },
      include: {
        course: true
      }
    });

    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const { name, avatar } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { name, avatar }
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;