import express from 'express';
import { postComment } from '../controllers/comment/postComment.js';
import { verifyUser } from '../middlewares/auth.js';

const router = express.Router();

router.post('/:postId', verifyUser, postComment);

export default router;
