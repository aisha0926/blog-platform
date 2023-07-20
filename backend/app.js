import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import User from './models/User.js';

const app = express();
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


app.post('/register', async (req,res )=> {
  const {firstName,lastName ,email  ,username, password,confirmpassword} = req.body;
  const userDoc = await User.create({
    firstName,
    lastName,
    email,
    username,
    password,
    confirmpassword,
  });
  res.json({userDoc});
  

})

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`);
});
