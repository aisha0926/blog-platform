import express from 'express';
import ImageUpload from '../controllers/image/imageUpload.js';

const router = express.Router();

router.post('/', ImageUpload);

export default router;
