import Post from '../../models/Post.js';
import User from '../../models/User.js';
// del8  post
export const deletePost = async (req, res) => {
    const { postId } = req.params;
  
    try {
      //  if  user is authenticated
      if (!req.user) {
        return res.status(401).send({ message: 'Unauthorized access' , error:error.message});
      }
  
      // get the authenticated user id
      const { userId } = req.user;
  
      // look for post by postId
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).send({ message: 'Post not found' , error:error.message });
      }
  
      // check if the user is also the author
      if (post.author.toString() !== userId) {
        return res.status(403).send({ message: 'Not authorized to delete this post' , error:error.message });
      }
  
      // soft del8  post\

      //   use isDeleted  func
    post.isDeleted=true;
    
      await post.save();
  
      res.status(200).send({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Server error', error: error.message });
    }
  };
  