// backend/src/routes/userRoutes.js
import express from 'express';
import { requireAuth } from '../middlewares/authMiddleware.js';
import {
  getMyProfile,
  updateMyProfile,
  searchUsersBySkill,
  getUserById
} from '../controllers/userController.js';

const router = express.Router();

// Authenticated user routes
router.get('/me', requireAuth, getMyProfile);
router.put('/me', requireAuth, updateMyProfile);

// Public routes
router.get('/search', searchUsersBySkill);
router.get('/:id', getUserById);

export default router;
