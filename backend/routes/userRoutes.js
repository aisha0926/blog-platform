import express from 'express';
import viewSpecificUser from '../controllers/User/viewSpecificUser.js';
import { loginUser } from '../controllers/loginUser.js';

const router = express.Router();

router.get('/:userId', viewSpecificUser);

router.post('/login', loginUser);

export default router;
