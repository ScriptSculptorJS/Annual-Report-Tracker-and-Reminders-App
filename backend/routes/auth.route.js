import express from 'express';
import { login, logout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/', login);
router.post('/logout', logout);

export default router;