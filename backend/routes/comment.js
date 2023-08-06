import express from 'express';
import { postComment } from '../controllers/comment/postComment.js';
import { verifyUser } from '../middlewares/auth.js';
import { putComment } from '../controllers/comment/putComment.js';
import deleteComment from '../controllers/comment/deleteComment.js';
import getComments from '../controllers/comment/getComments.js';

const router = express.Router();

router.patch('/', verifyUser, putComment);
router.delete('/', verifyUser, deleteComment);
router.get('/all/:postId', getComments);
router.post('/:postId', verifyUser, postComment);

export default router;