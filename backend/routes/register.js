import { registerUser } from '../controllers/auth/registerUser.js';
import express from 'express';

const router = express.Router()

 const register = router.post('/register', registerUser)

export default register;