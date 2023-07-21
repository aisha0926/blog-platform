import express from 'express';
import viewSpecificUser from '../controllers/User/viewSpecificUser';

const router = express.Router();

router.get('/user/:userId', viewSpecificUser);

export default router;
