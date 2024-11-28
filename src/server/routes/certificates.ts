import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get all certificates for user
router.get('/', auth, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const certificates = await prisma.certificate.findMany({
      where: { userId },
      include: {
        course: true
      },
      orderBy: {
        issuedAt: 'desc'
      }
    });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
});

// Get certificate by id
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    
    const certificate = await prisma.certificate.findFirst({
      where: {
        id,
        userId
      },
      include: {
        course: true,
        user: true
      }
    });
    
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certificate' });
  }
});

// Get user's total study hours
router.get('/stats/hours', auth, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { totalHours: true }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ totalHours: user.totalHours });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch study hours' });
  }
});

// Get user's quiz grades
router.get('/stats/grades', auth, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const progress = await prisma.courseProgress.findMany({
      where: {
        userId,
        grade: { not: null }
      },
      include: {
        course: true
      }
    });
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch grades' });
  }
});

export default router;