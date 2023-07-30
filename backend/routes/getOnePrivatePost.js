import express from "express";
import specificPrivatePost from "../controllers/privatePosts/specificPrivatePost.js";

const router = express.Router();

const getOnePrivatePost = router.get("/post/:postId", specificPrivatePost);

export default getOnePrivatePost;
