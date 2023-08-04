import Post from '../../models/Post.js';
import Tags from '../../models/Tags.js';
import User from '../../models/User.js';



export const createPost = async (req, res) => {
    const {content} = req.body;
    const { title,  imageUrl, tags } = JSON.parse(req.body.data);
    try {
      if (!req.user) {
        return res.status(401).send({ message: 'Unauthorized access', error: error.message });
      }
      const { userId } = req.user;
  
    
      const userExists = await User.findById(userId);
      if (!userExists) {
        return res.status(404).send({ message: 'User not found' , error: error.message });
      }

      const tagIds = [];
      for (const tag of tags) {
        let existingTag = await Tags.findOne({ name: tag });
        if (!existingTag) {
          existingTag = await Tags.create({ name: tag });
        }
        tagIds.push(existingTag._id);
      }
  
      const newPost = new Post({
        author: userId,
        title,
        content,
        image: imageUrl,
        tags: tagIds,
      });
  
      // save post
     const saveNewPost =  await newPost.save();
   

     const mapTag = Promise.all(tags.map(async(el) => {
      const findTags = await Tags.findOne({ name: el });

      if (!findTags) {
        const newTag = await Tags.create({
          name: el,
          postId: saveNewPost._id,
        });

        return newTag
      } else {
        const findDuplicates = findTags.postId.find((el) =>
        el.equals(saveNewPost._id)
      );

      if (!findDuplicates) {
        return await Tags.findByIdAndUpdate(
          findTags._id,
          {
            $push: { postId: saveNewPost._id},
          },
          { new: true }
        );
      } else {
        return "Error"
      }

      }

     }))

     const allMap = await mapTag;
     console.log(allMap)
  
      res.status(201).send({ message: 'Blog post created successfully' , data: newPost, tags: allMap});
    } catch (error) {
      res.status(500).send({ message: 'Server error', error: error.message });
    }
  };