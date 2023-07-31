import express from 'express';
import { loginUser } from '../controllers/loginUser.js';
import { viewUserAccount } from '../controllers/viewUserAccount.js';

const router = express.Router();

router.post('/login', loginUser);

router.get('/:userId', viewUserAccount);

export default router;