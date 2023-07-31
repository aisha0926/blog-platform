import express from "express";
import deactivateUser from "../controllers/deactivateUser/deactivateUser.js";

const router = express.Router();

const deleteUser = router.delete("/deactivate", deactivateUser);

export default deleteUser;