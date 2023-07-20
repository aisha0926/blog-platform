import express from 'express';

const router = express.Router();

import publicPosts from '../controllers/publicPosts.js';

router.get('/route', publicPosts);

export default router;
