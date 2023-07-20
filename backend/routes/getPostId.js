import express from "express";
import specificPost from "../controllers/specificPost/specificPost.js";

const router = express.Router();

const getPostId = router.get("/api/v1/post/:postId", specificPost);

export default getPostId;
