// backend/src/controllers/swapController.js
import { Swap } from '../models/Swap.js';

export const createSwapRequest = async (req, res) => {
  const { toUser, offeredSkill, requestedSkill, message } = req.body;
  try {
    const swap = await Swap.create({
      fromUser: req.session.userId,
      toUser,
      offeredSkill,
      requestedSkill,
      message,
    });
    res.status(201).json(swap);
  } catch (err) {
    res.status(500).json({ message: 'Swap creation failed' });
  }
};

export const getMySwapRequests = async (req, res) => {
  try {
    const swaps = await Swap.find({
      $or: [
        { fromUser: req.session.userId },
        { toUser: req.session.userId },
      ],
    })
      .populate('fromUser', 'name')
      .populate('toUser', 'name');

    res.json(swaps);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching swaps' });
  }
};

export const respondToSwapRequest = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body; // accept or reject

  try {
    const swap = await Swap.findById(id);
    if (!swap || swap.toUser.toString() !== req.session.userId) {
      return res.status(403).json({ message: 'Not authorized to respond' });
    }

    swap.status = action === 'accept' ? 'accepted' : 'rejected';
    await swap.save();
    res.json({ message: `Swap ${action}ed` });
  } catch (err) {
    res.status(500).json({ message: 'Response failed' });
  }
};

export const deletePendingSwap = async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);
    if (swap.fromUser.toString() !== req.session.userId || swap.status !== 'pending') {
      return res.status(403).json({ message: 'Cannot delete this swap' });
    }

    await swap.deleteOne();
    res.json({ message: 'Swap deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
};

export const leaveFeedback = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const swap = await Swap.findById(req.params.id);
    if (swap.fromUser.toString() !== req.session.userId && swap.toUser.toString() !== req.session.userId) {
      return res.status(403).json({ message: 'Not your swap' });
    }
    swap.feedback = { rating, comment };
    await swap.save();
    res.json({ message: 'Feedback submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Feedback failed' });
  }
};
