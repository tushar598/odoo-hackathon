// backend/src/middlewares/authMiddleware.js
export const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized: Please log in' });
};
