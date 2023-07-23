import express from 'express';
import { postComment } from '../controllers/comment/postComment.js';
import { verifyUser } from '../middlewares/auth.js';
import { putComment } from '../controllers/comment/putComment.js';

const router = express.Router();

router.patch('/', verifyUser, putComment);
router.post('/:postId', verifyUser, postComment);

export default router;
