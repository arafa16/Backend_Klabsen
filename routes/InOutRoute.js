import express from 'express';
import { 
    createInOut, 
    deleteInOut, 
    getDataFinger, 
    getInOut, 
    getInOutById, 
    getInOutByUser, 
    updateInOut 
} from '../controllers/InOut.js';

const route = express.Router();


route.get('/inOuts', getInOut);
route.get('/inOuts/:id', getInOutById);
route.get('/inOuts/user/:id', getInOutByUser);
route.post('/inOuts', createInOut);
route.patch('/inOuts/:id', updateInOut);
route.delete('/inOuts/:id', deleteInOut);

route.get('/inOutMesin', getDataFinger);

export default route;