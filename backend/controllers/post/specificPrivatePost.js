import Post from "../../models/Post.js";

const specificPrivatePost = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ message: "Unauthorized access" });
    }
    // get authenticated user id from
    const { userId } = req.user;
    const { postId } = req.params;

    //view the specific private  post
    const viewPost = await Post.find({
      _id: postId,
      author: userId,
      privacyType: "private",
    }).populate("author", "_id firstName lastName");

    res.status(200).json({
      message: "post found",
      postData: viewPost,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching post`, error: error.message });
  }
};

export default specificPrivatePost;
