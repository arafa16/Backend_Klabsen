import express from 'express';
import { 
    createPendapatan, 
    deletePendapatan, 
    getPendapatan, 
    getPendapatanById, 
    getPendapatanByUser, 
    getPendapatanTable,
    updatePendapatan 
} from '../controllers/Pendapatan.js';

const route = express.Router();

route.get('/pendapatan/:limit&:page&:userId', getPendapatanByUser);
route.get('/pendapatan/:limit&:page', getPendapatanTable);
route.get('/pendapatan/:id', getPendapatanById);
route.get('/pendapatan', getPendapatan);
route.post('/pendapatan', createPendapatan);
route.patch('/pendapatan/:id', updatePendapatan);
route.delete('/pendapatan/:id', deletePendapatan);

export default route;