import mongoose from 'mongoose';
import Post from '../../models/Post.js';
import Like from '../../models/Like.js';

export default async function addLike(req, res) {
  const { userId } = req.user;
  const { postId } = req.params;

  try {
    //   Check if the user liked the same post
    const findPost = await Post.findById(postId);

    //   Check if the post isn't liked yet
    if (findPost.author.equals(new mongoose.Types.ObjectId(userId))) {
      const checkIfLiked = await Like.findOne({
        liked: true,
        userId,
        postId,
      });

      if (checkIfLiked) {
        checkIfLiked.liked = false;

        const updateLike = await checkIfLiked.save();

        return updateLike
          ? res.status(200).send({ message: 'Updated like', updateLike })
          : res
              .status(404)
              .send({ message: 'Cannot update like, something went wrong' });
      } else {
        const addLike = await Like.create({
          userId,
          postId,
          liked: true,
        });

        return addLike
          ? res.status(200).send({ message: 'Like added', likedPost: addLike })
          : res.status(404).send({ message: 'Cannot find post' });
      }
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
}