// backend/src/routes/swapRoutes.js
import express from 'express';
import { requireAuth } from '../middlewares/authMiddleware.js';
import {
  createSwapRequest,
  getMySwapRequests,
  respondToSwapRequest,
  deletePendingSwap,
  leaveFeedback
} from '../controllers/swapController.js';

const router = express.Router();

router.post('/', requireAuth, createSwapRequest);
router.get('/', requireAuth, getMySwapRequests);
router.patch('/:id/respond', requireAuth, respondToSwapRequest);
router.delete('/:id', requireAuth, deletePendingSwap);
router.post('/:id/feedback', requireAuth, leaveFeedback);

export default router;
