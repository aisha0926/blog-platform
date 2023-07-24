import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";

const specificPost = async (req, res) => {
  try {
    const { postId } = req.params;
    //view the specific post and it should be a public privacyType
    const viewPost = await Post.findById({
      _id: postId,
    }).populate("author", "username");

    if (viewPost.privacyType === "private") {
      return res.status(200).json("This is a Private post");
    }

    // view comment of the post
    const viewComment = await Comment.find({
      postId: postId,
      isDeleted: false,
    })
      .populate("userId", "content")
      .exec();

    res.status(200).json({
      message: "post found",
      postData: viewPost,
      commentsList: viewComment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching post`, error: error.message });
  }
};

export default specificPost;
