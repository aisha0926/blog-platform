import express from 'express';
import specificPost from '../controllers/specificPost/specificPost.js';

const router = express.Router();

router.get('/:postId', specificPost);

export default router;
