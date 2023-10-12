import express from 'express';
import { Login, Logout, getMe } from '../controllers/Auth.js';

const router = express.Router();

router.get('/me', getMe);
router.post('/login', Login);
router.delete('/logout', Logout);

export default router