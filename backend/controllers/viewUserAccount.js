import User from '../models/User';

export const viewUserAccount = async (req, res) => {
  try {
    const findUser = await User.findById(req.user);
    //   If I'm logged in, I should be able to view my account
    if (!findUser) return res.status(404).send({ message: 'User not found' });

    res.status(200).send({ message: 'Account found', data: findUser });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
};
