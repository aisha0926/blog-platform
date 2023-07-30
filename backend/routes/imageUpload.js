import express from 'express';
import ImageUpload from '../controllers/imageUpload.js';

const router = express.Router();

router.post('/', ImageUpload);

export default router;
