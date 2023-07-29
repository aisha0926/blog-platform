import Post from '../../models/Post.js';
import User from '../../models/User.js';


export const updatePost = async (req, res) => {
    const { postId } = req.params;
    const { title, content, summary, type, privacyType, imageUrl } = req.body;
  
    try {
      // check if the user is authenticated
      if (!req.user) {
        return res.status(401).send({ message: 'Unauthorized access' });
      }
  
      // get the authenticated user id
      const { userId } = req.user;
  
      // fnd the post by postId
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).send({ message: 'Post not found' });
      }
  
      // checking if the  user is the author of the post
      if (post.author.toString() !== userId) {
        return res.status(403).send({ message: 'Not authorized to update this post' });
      }
  
    //   update post
      post.title = title;
      post.content = content;
      post.summary = summary;
      post.type = type;
      post.privacyType = privacyType;
      post.image = imageUrl;
  
      // save post
      await post.save();
  
      res.status(200).send({ message: 'Post updated successfully', data: post });
    } catch (error) {
      res.status(500).send({ message: 'Server error', error: error.message });
    }
  };
  