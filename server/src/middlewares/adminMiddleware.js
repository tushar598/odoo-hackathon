// backend/src/middlewares/adminMiddleware.js
import { User } from '../models/User.js';

export const requireAdmin = async (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized: Please log in' });
  }

  try {
    const user = await User.findById(req.session.userId);
    if (user && user.isAdmin) {
      return next();
    } else {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server error validating admin access' });
  }
};
