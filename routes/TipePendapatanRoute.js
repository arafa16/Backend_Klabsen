import express from 'express';
import { 
    createTipePendapatan, 
    deleteTipePendapatan, 
    getTipePendapatan, 
    getTipePendapatanById, 
    getTipePendapatanTable, 
    updateTipePendapatan 
} from '../controllers/TipePendapatan.js';

const router = express.Router();

router.get('/tipePendapatan/:limit&:page', getTipePendapatanTable);
router.get('/tipePendapatan/:id', getTipePendapatanById);
router.get('/tipePendapatan', getTipePendapatan);
router.post('/tipePendapatan', createTipePendapatan);
router.patch('/tipePendapatan/:id', updateTipePendapatan);
router.delete('/tipePendapatan/:id', deleteTipePendapatan);

export default router;