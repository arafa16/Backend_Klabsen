import express from 'express';
import { 
    createGolonganDarah, 
    deleteGolonganDarah,
    getGolonganDarahById, 
    getGolonganDarahs, 
    getGolonganDarahsTable, 
    updateGolonganDarah
} from '../controllers/GolonganDarah.js';

const router = express.Router();

router.get('/golonganDarah/:limit&:page', getGolonganDarahsTable);
router.get('/golonganDarah/:id', getGolonganDarahById);
router.get('/golonganDarah', getGolonganDarahs);
router.post('/golonganDarah', createGolonganDarah);
router.patch('/golonganDarah/:id', updateGolonganDarah);
router.delete('/golonganDarah/:id', deleteGolonganDarah);

export default router;