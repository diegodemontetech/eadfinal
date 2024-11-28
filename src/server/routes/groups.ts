import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth';
import { UserGroupSchema } from '../../types/api';

const router = express.Router();
const prisma = new PrismaClient();

// Get all groups
router.get('/', auth, async (req, res) => {
  try {
    const groups = await prisma.userGroup.findMany({
      include: {
        users: true,
        courses: true
      }
    });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
});

// Create group
router.post('/', auth, async (req, res) => {
  try {
    const data = UserGroupSchema.parse(req.body);
    const group = await prisma.userGroup.create({
      data: {
        name: data.name,
        permissions: data.permissions,
        courses: {
          connect: data.courseIds.map(id => ({ id }))
        }
      }
    });
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group' });
  }
});

// Update group
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const data = UserGroupSchema.parse(req.body);
    
    const group = await prisma.userGroup.update({
      where: { id },
      data: {
        name: data.name,
        permissions: data.permissions,
        courses: {
          set: data.courseIds.map(courseId => ({ id: courseId }))
        }
      }
    });
    
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update group' });
  }
});

// Delete group
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.userGroup.delete({
      where: { id }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete group' });
  }
});

export default router;