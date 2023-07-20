import Post from "./../models/Post.js";
//set the default items per page
const itemsPerPage = 5;
const publicPosts = async (req, res) => {
  // add filter userId, limit, page
  const userId = req.query.userId;
  const limit = parseInt(req.query.limit) || itemsPerPage;
  const page = parseInt(req.query.page) || 1;
  const filter = userId ? { author: userId } : {};

  try {
    // count the total documents to be retrieved in Post
    const countDocs = await Post.countDocuments({
      ...filter,
      privacyType: "public",
    });
    // count the total pages need to display the documents
    const countPages = Math.ceil(countDocs / limit);

    // query the documents needed find using author userId and post in public
    const documents = await Post.find({ ...filter, privacyType: "public" })
      // retrieve only the username of the author
      .populate("author", "username")
      // for pagination, calculate the the number of documents to be skipped based on current page
      .skip((page - 1) * limit)
      // set the number of documents to return per page
      .limit(limit) //
      // execute the query
      .exec();

    res.status(201).json({
      currentPage: page,
      totalPage: countPages,
      data: documents,
    });
  } catch (error) {
    res.status(500).json({ message: `Error fetching public posts` });
  }
};

export default publicPosts;
