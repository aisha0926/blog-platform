import Comment from '../../models/Comment.js';

export const postComment = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.user;
  try {
    if (!userId || !postId)
      return res.status(401).send({ message: 'Unauthorised access' });

    if (postId && userId) {
      const newComment = await Comment.create({
        userId,
        postId,
        content: req.body.content,
      });

      newComment
        ? res.status(200).send({
            message: 'Successfully added comment',
            comment: newComment,
          })
        : res.status(404).send({
            message: 'Unable to post comment. Please check required fields',
          });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
};

/* 
{
    "message": "Blog post created successfully",
    "data": {
        "author": "64b954d34538f8dc7f6af196",
        "title": "Test",
        "content": "something",
        "summary": "test",
        "type": "normal",
        "privacyType": "public",
        "deletedAt": null,
        "_id": "64bcd892662e0dce85e3ad3c",
        "createdAt": "2023-07-23T07:36:50.307Z",
        "updatedAt": "2023-07-23T07:36:50.307Z",
        "__v": 0
    }
}

*/
