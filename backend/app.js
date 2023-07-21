import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import getPosts from './routes/getPosts.js';
import userRoutes from './routes/user.js';
import dotenv from 'dotenv';
import cors from 'cors';
import { registerUser } from './controllers/auth/registerUser.js';
import { verifyUser, } from './middlewares/auth.js';
import { loginUser } from './controllers/loginUser.js';



const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;
app.use(express.json())
app.use(cors());
dotenv.config();

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log('DB CONNECTED');
  })
  .catch((err) => {
    console.log(err);
});

app.post('/register', registerUser);
app.post('/login', verifyUser, loginUser);

app.get('/protected', verifyUser, (req, res) => {
  res.json({ message: 'This is a protected route.' });
});


app.use(getPosts);
app.use('/api/v1/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`);
});
