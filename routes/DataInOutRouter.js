import express from 'express';
import { importInOut } from '../controllers/DataInOut.js';

const router = express.Router();

router.post('/import', importInOut)

export default router;