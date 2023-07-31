import { createPost } from '../controllers/post/createPost.js';
// import { updatePost } from '../controllers/post/updatePost.js';
import { verifyUser } from '../middlewares/auth.js';
import express from 'express';
import publicPosts from '../controllers/post/publicPosts.js';
import specificPost from '../controllers/post/specificPost.js';
import specificPrivatePost from '../controllers/post/specificPrivatePost.js';
import privatePosts from '../controllers/post/privatePosts.js';

const router = express.Router();

router.post('/', verifyUser, createPost);
router.get('/posts', publicPosts);
router.get('/private/posts', verifyUser, privatePosts);
router.get('/public/:postId', specificPost);
// router.put('/:postId', verifyUser, updatePost);
router.get('/private/post/:postId', specificPrivatePost);

export default router;
