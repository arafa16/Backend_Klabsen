import express from 'express';
import { 
    createTipeAbsen, 
    deleteTipeAbsen, 
    getTipeAbsen, 
    getTipeAbsenById, 
    getTipeAbsenTable, 
    updateTipeAbsen 
} from '../controllers/TipeAbsen.js';

const router = express.Router();

router.get('/tipeAbsen/:limit&:page', getTipeAbsenTable);
router.get('/tipeAbsen/:id', getTipeAbsenById);
router.get('/tipeAbsen', getTipeAbsen);
router.post('/tipeAbsen', createTipeAbsen);
router.patch('/tipeAbsen/:id', updateTipeAbsen);
router.delete('/tipeAbsen/:id', deleteTipeAbsen);

export default router;