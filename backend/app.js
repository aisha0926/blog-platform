import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import path from 'path';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import { uploadImage } from './middlewares/imageUpload.js';

import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentsRoutes from './routes/comment.js';
import likeRoutes from './routes/like.js';
import tagRoutes from './routes/tags.js';
import imageRoutes from './routes/imageUpload.js';

const app = express();

const PORT = process.env.PORT || 4000;

app.use(uploadImage);

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log('DB CONNECTED');
  })
  .catch((err) => {
    console.log(err);
  });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use('/images', express.static(path.resolve('imageUploads')));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/tags', tagRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/comment', commentsRoutes);
app.use('/api/v1/like', likeRoutes);
app.use('/api/v1/image-upload', imageRoutes);

app.listen(PORT, () => {
  console.log(`Listening in port http://localhost:${PORT}`);
});
