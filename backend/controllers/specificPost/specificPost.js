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

    //Pagination options for comments
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const totalComments = await Comment.countDocuments({
      postId: postId,
      isDeleted: false,
    });

    const totalPages = Math.ceil(totalComments / limit);

    // view comment of the post
    const viewComment = await Comment.find({
      postId: postId,
      isDeleted: false,
    })
      .populate("userId", "content")
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    res.status(200).json({
      message: "post found",
      postData: viewPost,
      commentsList: viewComment,
      totalPage: totalPages,
      currentPage: page,
      limit: limit,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching post`, error: error.message });
  }
};

export default specificPost;
