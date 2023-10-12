import express from 'express';
import { createPelanggaran, deletePelanggaran, getPelanggaran, getPelanggaranById, getPelanggaranTable, updatePelanggaran } from '../controllers/Pelanggaran.js';

const router = express.Router();

router.get('/pelanggaran/:limit&:page', getPelanggaranTable);
router.get('/pelanggaran/:id', getPelanggaranById);
router.get('/pelanggaran', getPelanggaran);
router.post('/pelanggaran', createPelanggaran);
router.patch('/pelanggaran/:id', updatePelanggaran);
router.delete('/pelanggaran/:id', deletePelanggaran);

export default router;