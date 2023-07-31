import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/User.js';

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
export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const findUser = await User.findOne({
      username: username,
      status: 'active',
    });

    if (!findUser)
      return res.status(400).send({ message: `Cannot find user ${username}` });

    const checkPassword = bcrypt.compareSync(password, findUser.password);

    if (!checkPassword)
      return res.status(401).send({ message: 'Incorrect password' });

    if (checkPassword) {
      const token = createToken({
        userId: findUser._id,
        isAdmin: findUser.isAdmin,
      });

      res.status(200).send({ message: 'Login successful', token: token });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
};