import express from 'express';
import { loginUser } from '../controllers/loginUser.js';
import { viewUserAccount } from '../controllers/viewUserAccount.js';
import { verifyUser } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/me', verifyUser, viewUserAccount);

export default router;
