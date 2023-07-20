import express from "express";
import publicPosts from "../controllers/publicPosts.js";

const router = express();

const getPosts = () => {
  return router.get("/api/v1/posts", publicPosts);
  //to fetch data in frontend or postman the path is /api/v1/posts?limit=${limit}&page=${page}&userId=$userId
};

export default getPosts;
