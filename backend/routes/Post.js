import { createPost } from '../controllers/post/createPost.js';
import { updatePost } from '../controllers/post/updatePost.js';
import { verifyUser } from '../middlewares/auth.js';
import express from 'express';



const router = express.Router();


router.post('/', verifyUser, createPost);
router.put('/:postId', verifyUser, updatePost);


export default router;