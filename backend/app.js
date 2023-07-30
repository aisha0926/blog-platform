import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import path from "path";
import { verifyUser } from "./middlewares/auth.js";
import { v2 as cloudinary } from "cloudinary";
import { uploadImage } from "./middlewares/imageUpload.js";
import deleteUser from "./routes/deleteUser.js";
import postRoutes from "./routes/postPost.js";
import registerRoutes from "./routes/register.js";
import getPrivatePosts from "./routes/getPrivatePosts.js";
import getOnePrivatePost from "./routes/getOnePrivatePost.js";
import commentsRoutes from "./routes/comment.js";
import likeRoutes from "./routes/like.js";
import getPosts from "./routes/getPosts.js";
import userRoutes from "./routes/userRoutes.js";
import putUser from "./routes/putUser.js";
import tagRoutes from "./routes/tags.js";
import imageRoutes from "./routes/imageUpload.js";
import cors from "cors";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

const PORT = process.env.PORT || 4000;

// app.use(uploadImage);

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/images", express.static(path.resolve("imageUploads")));

app.use("/api/v1/tags", tagRoutes);
app.use("/api/v1/me", verifyUser, deleteUser);
app.use("/api/v1", registerRoutes);
app.use("/api/v1", getPosts);
app.use("/api/v1", postRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/me", verifyUser, getPrivatePosts);
app.use("/api/v1/me", verifyUser, getOnePrivatePost);
app.use("/api/v1/comment", commentsRoutes);
app.use("/api/v1/like", likeRoutes);
app.use("/api/v1/image-upload", imageRoutes);
app.use("/api/v1/me", verifyUser, uploadImage, putUser);

app.listen(PORT, () => {
  console.log(`Listening in port http://localhost:${PORT}`);
});
