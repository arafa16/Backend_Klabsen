import express from 'express';
import { 
    createInOut, 
    deleteInOut, 
    getInOut, 
    getInOutById, 
    getInOutByUser, 
    updateInOut 
} from '../controllers/InOut.js';

const route = express.Router();


route.get('/inOut', getInOut);
route.get('/inOut/:id', getInOutById);
route.get('/inOut/user/:id', getInOutByUser);
route.post('/inOut', createInOut);
route.patch('/inOut/:id', updateInOut);
route.delete('/inOut/:id', deleteInOut);

export default route;