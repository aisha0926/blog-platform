import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';

import { verifyUser } from './middlewares/auth.js';

import getOnePrivatePost from './routes/getOnePrivatePost.js';
import getPosts from './routes/getPosts.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postPost.js';
import registerRoutes from './routes/register.js';
import getPrivatePosts from './routes/getPrivatePosts.js';
import commentsRoutes from './routes/comment.js';
import likeRoutes from './routes/like.js';

const app = express();

const PORT = process.env.PORT || 4000;
console.log(PORT);
app.use(express.json());
app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log('DB CONNECTED');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/api/v1', registerRoutes);
app.use('/api/v1', getPosts);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/me', verifyUser, getPrivatePosts);
app.use('/api/v1/me', verifyUser, getOnePrivatePost);
app.use('/api/v1/comment', commentsRoutes);
app.use('/api/v1/like', likeRoutes);

app.listen(PORT, () => {
  console.log(`Listening in port http://localhost:${PORT}`);
});
