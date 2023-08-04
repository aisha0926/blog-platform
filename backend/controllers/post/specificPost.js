import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";
import Tags from "../../models/Tags.js";

const specificPost = async (req, res) => {
  try {
    const { postId } = req.params;
    //view the specific post and it should be a public privacyType
    const viewPost = await Post.findById({
      _id: postId,
    }).populate("author", "_id firstName lastName avatar");

    if (viewPost.privacyType === "private") {
      return res.status(401).json({ message: "This is a Private post" });
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
      .populate("userId", "firstName lastName avatar")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    // Retrieve tags for the specific post
    const tags = await Tags.find({ postId: postId }).select("name");

    res.status(200).json({
      message: "Post found",
      postData: {
        ...viewPost._doc,
        tags: tags.map((tag) => tag.name), // Extract the tag names from the tags array
      },
      commentsList: viewComment,
      totalPageForComment: totalPages,
      currentCommentPage: page,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching post`, error: error.message });
  }
};

export default specificPost;
