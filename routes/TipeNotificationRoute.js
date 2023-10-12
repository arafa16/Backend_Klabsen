import express from 'express';
import { 
    createTipeNotification, 
    deleteTipeNotification, 
    getTipeNotification, 
    getTipeNotificationById, 
    getTipeNotificationTable, 
    updateTipeNotification 
} from '../controllers/TipeNotification.js';

const router = express.Router();

router.get('/tipeNotification/:limit&:page', getTipeNotificationTable);
router.get('/tipeNotification/:id', getTipeNotificationById);
router.get('/tipeNotification', getTipeNotification);
router.post('/tipeNotification', createTipeNotification);
router.patch('/tipeNotification/:id', updateTipeNotification);
router.delete('/tipeNotification/:id', deleteTipeNotification);

export default router;