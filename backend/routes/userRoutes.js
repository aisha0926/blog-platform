import express from 'express';
import viewSpecificUser from '../controllers/User/viewSpecificUser.js';
import { loginUser } from '../controllers/auth/loginUser.js';
import { viewUserAccount } from '../controllers/User/viewUserAccount.js';
import { verifyUser } from '../middlewares/auth.js';
import { viewMe } from '../controllers/User/viewMe.js';
import { registerUser } from '../controllers/auth/registerUser.js';
import updateUserProfile from '../controllers/User/updateUserProfile.js';
import deactivateUser from '../controllers/User/deactivateUser.js';

const router = express.Router();

router.get('/:userId', viewSpecificUser);

router.post('/login', loginUser);
router.get('/me', verifyUser, viewMe);
router.get('/:userId', viewUserAccount);
router.post('/register', registerUser);
router.put('/updateProfile', updateUserProfile);
router.delete('/deactivate', verifyUser, deactivateUser);

export default router;
