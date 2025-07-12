// backend/src/controllers/adminController.js
import { User } from '../models/User.js';
import { Swap } from '../models/Swap.js';

export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-passwordHash');
  res.json(users);
};

export const banUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isBanned = true;
    await user.save();
    res.json({ message: 'User banned' });
  } catch (err) {
    res.status(500).json({ message: 'Ban failed' });
  }
};

export const approveSkillDescriptions = async (req, res) => {
  // Placeholder — depends on moderation model
  res.json({ message: 'Skill approval system not implemented yet' });
};

export const getAllSwaps = async (req, res) => {
  const swaps = await Swap.find()
    .populate('fromUser', 'name')
    .populate('toUser', 'name');
  res.json(swaps);
};

export const sendPlatformMessage = async (req, res) => {
  // Optional: Add announcement logic
  res.json({ message: 'Platform message sent (mock)' });
};

export const downloadReports = async (req, res) => {
  const swaps = await Swap.find().lean();
  const users = await User.find().lean();

  res.json({ users, swaps });
};
