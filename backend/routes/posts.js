import express from 'express';
import { postComment } from '../controllers/comment/postComment.js';

const router = express.Router();

router.post('/:postId', postComment);

export default router;
