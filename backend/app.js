import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import getPosts from './routes/getPosts.js';
import commentsRoutes from './routes/comment.js';

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log('DB CONNECTED');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/api/v1', getPosts);

app.use('/api/v1/comment', commentsRoutes);

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`);
});
