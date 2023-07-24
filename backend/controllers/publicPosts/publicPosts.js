import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";

const publicPosts = async (req, res) => {
  // add filter userId, limit, page
  const userId = req.query.userId;
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const filter = userId ? { author: userId } : {};

  try {
    // count the total documents to be retrieved in Post
    const countPosts = await Post.countDocuments({
      ...filter,
      privacyType: "public",
    });

    // count the total pages need to display the documents
    const countPages = Math.ceil(countPosts / limit);

    // query the documents needed find using author userId and post in public
    const posts = await Post.find({ ...filter, privacyType: "public" })

      // retrieve only the username of the author
      .populate("author", "username")

      // for pagination, calculate the the number of documents to be skipped based on current page
      .skip((page - 1) * limit)

      // set the number of documents to return per page
      .limit(limit)

      // execute the query
      .exec();

    // Retrieve coments for eact post and limit the number of comments
    const postIds = posts.map((post) => post._id);

    const comments = await Comment.find({
      postId: { $in: postIds },
      isDeleted: false,
    })
      .sort({ createdAt: -1 }) // sort by createdAt
      .populate("userId", "content")
      .exec();

    //Group comments by postId
    const commentsPerPost = comments.reduce((acc, comment) => {
      if (!acc[comment.postId]) {
        acc[comment.postId] = [];
      }
      acc[comment.postId].push(comment);
      return acc;
    }, {});
    //Combine comments with their respective posts
    const postsWithComments = posts.map((post) => {
      const comments = commentsPerPost[post._id] || [];
      return {
        ...post._doc,
        comments,
      };
    });

    res.status(200).json({
      currentPage: page,
      totalPage: countPages,
      data: postsWithComments,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching public posts`, error: error.message });
  }
};

export default publicPosts;
