import { createPost } from '../controllers/post/createPost.js';
import { verifyUser } from '../middlewares/auth.js';
import express from 'express';



const router = express.Router();


router.post('/post', verifyUser, createPost);

export default router;