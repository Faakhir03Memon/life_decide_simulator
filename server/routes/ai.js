import express from 'express';
import { getAdvice } from '../controllers/ai.js';

const router = express.Router();

router.post('/advice', getAdvice);

export default router;
