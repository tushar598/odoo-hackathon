// backend/src/models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  location: String,
  profilePhoto: String, // base64 image string (Data URL)
  skillsOffered: [String],
  skillsWanted: [String],
  availability: String, // e.g., "Weekends", "Evenings"
  isPublic: {
    type: Boolean,
    default: true,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export const User = mongoose.model('User', UserSchema);
