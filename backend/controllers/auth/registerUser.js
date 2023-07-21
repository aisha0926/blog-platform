import User from '../../models/User.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, username, password, confirmPassword } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken.' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already in use.' });
    }

   
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

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
    res.status(500).json({ error: 'error occurred during registration.' });
  }
};
