// backend/src/controllers/userController.js
import { User } from '../models/User.js';

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select('-passwordHash');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.session.userId, updates, { new: true }).select('-passwordHash');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile' });
  }
};

export const searchUsersBySkill = async (req, res) => {
  const { skill } = req.query;
  try {
    const users = await User.find({
      isPublic: true,
      isBanned: false,
      $or: [
        { skillsOffered: { $regex: skill, $options: 'i' } },
        { skillsWanted: { $regex: skill, $options: 'i' } },
      ],
    }).select('-passwordHash');

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Search failed' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user || !user.isPublic || user.isBanned) {
      return res.status(404).json({ message: 'User not found or not public' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};
