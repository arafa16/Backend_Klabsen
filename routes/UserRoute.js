import express from 'express';
import {
    createUser,
    deleteUser,
    getUserById, 
    getUsers, 
    getUsersTable
} from '../controllers/Users.js';

const router = express.Router();

router.get('/users/:limit&:page', getUsersTable);
router.get('/users/:id', getUserById);
router.get('/users', getUsers);
router.post('/users', createUser);
router.patch('/users/:id', createUser);
router.delete('/users/:id', deleteUser);

export default router;