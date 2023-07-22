import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import getPosts from "./routes/getPosts.js";
import userRoutes from "./routes/user.js";
import putUser from "./routes/putUser.js";
import { verifyUser } from "./middlewares/auth.js";
import { uploadImage } from "./middlewares/imageUpload.js";

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

app.use("/api/v1", getPosts);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/me", verifyUser, uploadImage.single("avatar"), putUser);

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`);
});
