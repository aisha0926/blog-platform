import express from "express";
import specificPost from "../controllers/specificPost/specificPost.js";

const router = express.Router();

const getPostId = router.get("/post/:postId", specificPost);

export default getPostId;
