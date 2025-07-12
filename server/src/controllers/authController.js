// backend/src/controllers/authController.js
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';

export const signupUser = async (req, res) => {
  const { name, email, password, username } = req.body;

  try {
    
    if (await User.findOne({ email })) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    
    if (await User.findOne({ username })) {
      return res.status(409).json({ message: 'Username already taken' });
    }

   
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, username, passwordHash });

   
    req.session.userId = newUser._id;
    res.status(201).json({
      message: 'Signup successful',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.session.userId = user._id;
    res.json({ message: 'Login successful', user: { id: user._id, name: user.name } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};


export const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
};
