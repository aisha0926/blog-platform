import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import getPosts from "./routes/getPosts.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(getPosts);

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`);
});
