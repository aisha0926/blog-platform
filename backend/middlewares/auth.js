import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

/**
 * This module generates a jsonwebtoken.
 *
 * @param {*} user - Payload you want to send
 * @returns the payload (payload, secret key)
 */
export const createToken = (user) => {
  return jwt.sign(user, process.env.SECRET_KEY);
};

/**
 * This module verifies a couple of things:
 *
 * 1. Verify if the user exists in the database
 * 2. Verify if the entered password is the same as the one in the database
 * 3. Check if the password is not a falsy value
 */
export const verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const findUser = await User.findOne({ username: username });

    if (!findUser)
      return res.status(400).send({ message: `Cannot find user ${username}` });

    const checkPasword = bcrypt.compareSync(password, findUser.password);

    if (checkPasword) {
      const token = createToken({
        userId: findUser._id,
        isAdmin: findUser.isAdmin,
      });

     

      next();
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during user verification.' });
  }
};

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ success: false, message: 'Invalid token.' });
    }
  };