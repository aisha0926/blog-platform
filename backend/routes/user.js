import express from 'express';
import { loginUser } from '../controllers/loginUser.js';
import { viewUserAccount } from '../controllers/viewUserAccount.js';
import { verifyUser } from '../middlewares/auth.js';
import { viewMe } from '../controllers/viewMe.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/me', verifyUser, viewMe);
router.get('/:userId', viewUserAccount);

export default router;
