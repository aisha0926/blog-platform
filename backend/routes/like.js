import express from 'express';
import addLike from '../controllers/like/addLike.js';
import { verifyUser } from '../middlewares/auth.js';

const router = express.Router();

router.post('/:postId', verifyUser, addLike);

export default router;