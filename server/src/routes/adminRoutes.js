// backend/src/routes/adminRoutes.js
import express from 'express';
import { requireAdmin } from '../middlewares/adminMiddleware.js';
import {
  getAllUsers,
  banUser,
  approveSkillDescriptions,
  getAllSwaps,
  sendPlatformMessage,
  downloadReports
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', requireAdmin, getAllUsers);
router.patch('/users/:id/ban', requireAdmin, banUser);
router.patch('/skills/approve', requireAdmin, approveSkillDescriptions);
router.get('/swaps', requireAdmin, getAllSwaps);
router.post('/announce', requireAdmin, sendPlatformMessage);
router.get('/reports', requireAdmin, downloadReports);

export default router;
