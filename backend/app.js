import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { registerUser } from './controllers/auth/registerUser.js';
import { loginUser } from './controllers/auth/loginUser.js';
import bcrypt from 'bcrypt';
import { verifyUser, createToken, verifyToken } from './middlewares/auth.js';
import User from './models/User.js';
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json())

app.use(cors({origin: 'http://localhost:3000', credentials: true }));
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

app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route.' });
});


app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`);
});
