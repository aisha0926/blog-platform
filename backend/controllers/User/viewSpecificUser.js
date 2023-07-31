import User from '../../models/User.js';

/**
 * Module which gets a specific user
 *
 * @query {*} userId - UserID from the request params
 */
export default async function viewSpecificUser(req, res) {
  const { userId } = req.params;

  try {
    const findUser = await User.findById(
      { _id: userId, status: 'active' },
      '-password  -status '
    );

    if (!findUser) return res.status(404).send({ message: 'User not found' });

    findUser
      ? res
          .status(200)
          .send({ message: 'Successfully found user', data: findUser })
      : res.status(400).send({ message: 'Cannot find user' });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
}
