import User from '../models/User.js';

export const viewMe = async (req, res) => {
  try {
    if (!req.user.userId)
      return res.status(401).send({ message: 'Authentication token required' });

    const findUser = await User.findById(req.user.userId);

    if (!findUser) return res.status(404).send({ message: 'User not found' });

    res.status(200).send({ message: 'User found', data: findUser });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};
