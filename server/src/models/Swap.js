// backend/src/models/Swap.js
import mongoose from 'mongoose';

const SwapSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  offeredSkill: {
    type: String,
    required: true,
  },
  requestedSkill: {
    type: String,
    required: true,
  },
  message: String,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  feedback: {
    rating: Number,
    comment: String,
  }
}, {
  timestamps: true,
});

export const Swap = mongoose.model('Swap', SwapSchema);
