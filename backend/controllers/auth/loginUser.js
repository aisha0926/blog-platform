import User from '../../models/User.js';
import { createToken } from '../../middlewares/auth.js';
import dotenv from 'dotenv';

export const loginUser = async (req, res) => {
  try {
    const { username } = req.body;
    const findUser = await User.findOne({ username });

    if (!findUser) {
      return res.status(404).json({ message: `Cannot find user ${username}` });
    }

    const token = createToken({
      userId: findUser._id,
      isAdmin: findUser.isAdmin,
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login.' });
  }
};
