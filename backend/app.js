import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import getPostId from "./routes/getPostId.js";

const app = express();
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/v1", getPostId);

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`);
});
