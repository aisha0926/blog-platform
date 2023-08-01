import Comment from '../../models/Comment.js';

export default async function getComments(req, res) {
  try {
    // find all comments that's under the same postID
    const findAllComments = await Comment.find({
      postId: req.body.postId,
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .populate({ path: 'userId', select: '_id firstName lastName' })
      .exec();

    findAllComments
      ? res.status(200).send({
          message: 'Succesfully retrieved all comments',
          comments: findAllComments,
        })
      : res.status(404).send({ message: 'No comments found' });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
}
