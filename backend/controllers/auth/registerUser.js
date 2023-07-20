import User from '../../models/User.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, username, password, confirmPassword } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const userDoc = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      confirmPassword,
    });

    res.json({ userDoc });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};
