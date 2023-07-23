export const postComment = async (req, res) => {
  const { postId } = req.params;
  try {
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
};
