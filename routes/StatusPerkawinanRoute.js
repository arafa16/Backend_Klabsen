import express from 'express';
import { createStatus, deleteStatus, getStatusById, getStatuses, getStatusesTable, updateStatus } from '../controllers/StatusPerkawinan.js';

const router = express.Router();

router.get('/statusPerkawinan/:limit&:page', getStatusesTable);
router.get('/statusPerkawinan/:id', getStatusById);
router.get('/statusPerkawinan', getStatuses);
router.post('/statusPerkawinan', createStatus);
router.patch('/statusPerkawinan/:id', updateStatus);
router.delete('/statusPerkawinan/:id', deleteStatus);

export default router;