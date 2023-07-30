import mongoose from 'mongoose';
import Comment from '../../models/Comment.js';

export default async function deleteComment(req, res) {
  const { commentId } = req.query;
  const { userId } = req.user;

  try {
    const findComment = await Comment.findById(commentId);

    if (findComment.userId.equals(new mongoose.Types.ObjectId(userId))) {
      findComment.isDeleted = true;

      const deletedComment = await findComment.save();

      deletedComment
        ? res.status(200).send({
            message: 'Successfully deleted comment',
          })
        : res.status(404).send({ message: 'Cannot delete comment' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
}
