import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 4000;

await mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log('Database Connected');
});

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`);
});
