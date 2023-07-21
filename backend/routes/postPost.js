import { createPost } from '../controllers/post/createPost.js';
import { verifyUser } from '../middlewares/auth.js';
import express from 'express';



const router = express.Router();


const postPost = router.post('/posts', verifyUser, createPost);

export default postPost;