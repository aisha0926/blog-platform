import express from "express";
import privatePosts from "../controllers/privatePosts/privatePosts.js";

const router = express.Router();

const getPrivatePosts = router.get("/posts", privatePosts);
//to fetch data in frontend or postman the path is /api/v1/me/posts?limit=${limit}&page=${page}

export default getPrivatePosts;
