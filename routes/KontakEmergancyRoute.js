import express from 'express';
import { 
    createKontak, 
    deleteKontak, 
    getKontakById, 
    getKontaks, 
    getKontaksTable, 
    updateKontak 
} from '../controllers/KontakEmergancy.js';

const router = express.Router();

router.get('/contact/:limit&:page', getKontaksTable);
router.get('/contact/:id', getKontakById);
router.get('/contact', getKontaks);
router.post('/contact', createKontak);
router.patch('/contact/:id', updateKontak);
router.delete('/contact/:id', deleteKontak);

export default router;