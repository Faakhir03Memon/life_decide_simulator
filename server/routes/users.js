import express from 'express';
import { getUserProfile, saveDecision } from '../controllers/users.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', auth, getUserProfile);
router.post('/save-decision', auth, saveDecision);

export default router;
