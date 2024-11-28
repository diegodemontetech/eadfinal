import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth';
import { EbookSchema } from '../../types/api';

const router = express.Router();
const prisma = new PrismaClient();

// Get all ebooks
router.get('/', auth, async (req, res) => {
  try {
    const ebooks = await prisma.ebook.findMany({
      include: {
        category: true
      }
    });
    res.json(ebooks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ebooks' });
  }
});

// Get ebook by id
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const ebook = await prisma.ebook.findUnique({
      where: { id },
      include: {
        category: true
      }
    });
    
    if (!ebook) {
      return res.status(404).json({ error: 'Ebook not found' });
    }
    
    res.json(ebook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ebook' });
  }
});

// Create ebook
router.post('/', auth, async (req, res) => {
  try {
    const data = EbookSchema.parse(req.body);
    const ebook = await prisma.ebook.create({
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
    res.json(ebook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create ebook' });
  }
});

// Update reading progress
router.post('/:id/progress', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const { currentPage, completed } = req.body;

    const progress = await prisma.ebookProgress.upsert({
      where: {
        userId_ebookId: {
          userId,
          ebookId: id
        }
      },
      update: {
        currentPage,
        completed,
        completedAt: completed ? new Date() : null
      },
      create: {
        userId,
        ebookId: id,
        currentPage,
        completed,
        completedAt: completed ? new Date() : null
      }
    });

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

export default router;