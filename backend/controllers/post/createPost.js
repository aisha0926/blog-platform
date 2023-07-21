import Post from '../../models/Post';


// creating a  post
export const createPost = async (req, res) => {
    const { title, content, summary, type, privacyType } = req.body;
  
    try {
      // check if the user is authenticated
      if (!req.user) {
        return res.status(401).send({ message: 'Unauthorized access' });
      }
  
      // get authenticated user id from 
      const { userId } = req.user;
  
      // check if user exist
      const userExists = await User.findById(userId);
      if (!userExists) {
        return res.status(404).send({ message: 'User not found' });
      }
  
    //   create post
      const newPost = new Post({
        author: userId,
        title,
        content,
        summary,
        type,
        privacyType,
      });
  
      // save post
      await newPost.save();
  
      res.status(201).send({ message: 'Blog post created successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Server error' });
    }
  };