import express from "express";
import updateUserProfile from "../controllers/updateUserProfile/updateUserProfile.js";

const router = express.Router();

const putUser = router.put("/updateProfile", updateUserProfile);

export default putUser;
