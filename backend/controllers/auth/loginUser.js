import User from '../../models/User.js';
import { createToken } from '../../middlewares/auth.js';
import dotenv from 'dotenv';

export const loginUser = async (req, res) => {
  try {
    // Get user data and check if it exists in the database or not
    const { token } = req;
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login.' });
  }
};
