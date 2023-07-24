import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import getPosts from './routes/getPosts.js';
import userRoutes from './routes/user.js';
import cors from 'cors';
import postRoutes from './routes/Post.js';
import registerRoutes from './routes/register.js';


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;
console.log(PORT);
app.use(express.json())
app.use(cors());


mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log('DB CONNECTED');
  })
  .catch((err) => {
    console.log(err);
});





app.use('/api/v1', postRoutes );
app.use(getPosts);
app.use('/api/v1' , registerRoutes)
app.use('/api/v1/user', userRoutes);

app.listen((PORT), () => {
  console.log(`Listening in port http://localhost:${PORT}`);
 
});
