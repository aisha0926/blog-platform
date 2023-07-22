import Post from "../../models/Post.js";

const privatePosts = async (req, res) => {
  // add filter limit, page
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;

  try {
    if (!req.user) {
      return res.status(401).send({ message: "Unauthorized access" });
    }
    // get authenticated user id from
    const { userId } = req.user;

    // count the total documents to be retrieved in Post
    const countDocs = await Post.countDocuments({
      author: userId,
      privacyType: "private",
    });
    // count the total pages need to display the documents
    const countPages = Math.ceil(countDocs / limit);

    // query the documents needed find using author userId and post in private
    const documents = await Post.find({
      author: userId,
      privacyType: "private",
    })
      // retrieve only the username of the author
      .populate("author", "username")
      // for pagination, calculate the the number of documents to be skipped based on current page
      .skip((page - 1) * limit)
      // set the number of documents to return per page
      .limit(limit) //
      // execute the query
      .exec();

    res.status(200).json({
      currentPage: page,
      totalPage: countPages,
      data: documents,
    });
  } catch (error) {
    res.status(500).json({ message: `Error fetching private posts` });
  }
};

export default privatePosts;
