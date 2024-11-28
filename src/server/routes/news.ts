import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth';
import { NewsSchema, CommentSchema } from '../../types/api';

const router = express.Router();
const prisma = new PrismaClient();

// Get all news
router.get('/', auth, async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      include: {
        author: true,
        comments: {
          include: {
            author: true,
            replies: {
              include: {
                author: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Get news by id
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const news = await prisma.news.findUnique({
      where: { id },
      include: {
        author: true,
        comments: {
          include: {
            author: true,
            replies: {
              include: {
                author: true
              }
            }
          }
        }
      }
    });
    
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Create news
router.post('/', auth, async (req, res) => {
  try {
    const data = NewsSchema.parse(req.body);
    const userId = (req as any).user.id;
    
    const news = await prisma.news.create({
      data: {
        ...data,
        author: {
          connect: { id: userId }
        }
      },
      include: {
        author: true
      }
    });
    
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create news' });
  }
});

// Add comment
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const data = CommentSchema.parse(req.body);
    
    const comment = await prisma.comment.create({
      data: {
        content: data.content,
        author: {
          connect: { id: userId }
        },
        news: {
          connect: { id }
        },
        parent: data.parentId ? {
          connect: { id: data.parentId }
        } : undefined
      },
      include: {
        author: true,
        replies: {
          include: {
            author: true
          }
        }
      }
    });
    
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

export default router;