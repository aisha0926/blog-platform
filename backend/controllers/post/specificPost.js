import Post from "../../models/Post.js";

const specificPost = async (req, res) => {
  try {
    const { postId } = req.params;
    //view the specific post and it should be a public privacyType
    const viewPost = await Post.findById({
      _id: postId,
    }).populate("author", "_id firstName lastName");

    if (viewPost.privacyType === "private") {
      return res.status(401).json({ message: "This is a Private post" });
    }

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

export default specificPost;
