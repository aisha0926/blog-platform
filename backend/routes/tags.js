import express from 'express';
import { verifyUser } from '../middlewares/auth.js';
import postTag from '../controllers/tags/postTags.js';
import getTags from '../controllers/tags/getTags.js';

const router = express.Router();

router.post('/', verifyUser, getTags);
router.post('/:postId', verifyUser, postTag);

export default router;
