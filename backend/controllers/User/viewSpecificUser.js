/**
 * Module which gets a specific user
 *
 * @query {*} userId - UserID from the request params
 */
export default viewSpecificUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const findUser = await User.findById({ _id: userId, status: 'active' });

    findUser
      ? res
          .status(200)
          .send({ message: 'Successfully found user', data: findUser })
      : res.status(400).send({ message: 'Cannot find user' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};
