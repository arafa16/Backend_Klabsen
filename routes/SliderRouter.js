import express from 'express';
import { 
    createSlider,
    deleteSLider,
    getSlider,
    getSLiderById,
    getSLiderTable
} from '../controllers/Slider.js';

const router = express.Router();

router.get('/slider', getSlider);
router.get('/slider/table/:limit&:page', getSLiderTable);
router.get('/slider/data/:uuid', getSLiderById);
router.post('/slider', createSlider);
router.delete('/slider/data/:uuid', deleteSLider);

export default router;