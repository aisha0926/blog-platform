import mongoose from 'mongoose';
import Comment from '../../models/Comment.js';

export const putComment = async (req, res) => {
  const { commentId } = req.query;
  const { userId } = req.user;

  try {
    //   edit comment posted by the user
    //   check if the comment is made by the same user
    const findComment = await Comment.findById(commentId);

    if (findComment.userId.equals(new mongoose.Types.ObjectId(userId))) {
      findComment.content = req.body.content;

      const updateComment = await findComment.save({ new: true });

      updateComment
        ? res
            .status(200)
            .send({ message: 'Successfully updated', comment: updateComment })
        : res.status(404).send({ message: 'Cannot update comment' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
};

/* 
{
    "message": "Successfully added comment",
    "comment": {
        "userId": "64b954d34538f8dc7f6af196",
        "postId": "64bcd892662e0dce85e3ad3c",
        "content": "This is a sample content",
        "_id": "64bce08b8d945cd67da214bd",
        "createdAt": "2023-07-23T08:10:51.565Z",
        "updatedAt": "2023-07-23T08:10:51.565Z",
        "__v": 0
    }
}
*/
