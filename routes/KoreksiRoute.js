import express from 'express';
import { 
    createKoreksi, 
    deleteKoreksi, 
    getKoreksi, 
    getKoreksiById, 
    updateKoreksi 
} from '../controllers/Koreksi.js';

const route = express.Router();

route.get('/koreksi/:limit&:page', getKoreksi);
route.get('/koreksi/:id', getKoreksiById);
route.get('/koreksi', getKoreksi);
route.post('/koreksi', createKoreksi);
route.patch('/koreksi/:id', updateKoreksi);
route.delete('/koreksi/:id', deleteKoreksi);

export default route;