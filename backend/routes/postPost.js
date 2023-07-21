import { createPost } from '../controllers/post/createPost';
import { verifyUser } from '../middlewares/auth';
import express from 'express';



const router = express.Router();


const postPost = router.post('/posts', verifyUser, createPost);

export default postPost;