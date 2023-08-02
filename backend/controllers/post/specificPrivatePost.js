import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";

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
    }).populate("author", "_id firstName lastName avatar");
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
      .populate("userId", "firstName lastName avatar")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    res.status(200).json({
      message: "post found",
      postData: viewPost,
      commentsList: viewComment,
      totalPageForComment: totalPages,
      currentPageCommentForComment: page,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching post`, error: error.message });
  }
};

export default specificPrivatePost;