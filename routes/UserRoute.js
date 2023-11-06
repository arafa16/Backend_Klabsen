import express from 'express';
import {
    createUser,
    deleteUser,
    getUserById, 
    getUsers, 
    getUsersTable,
    changePassword,
    updateUser
} from '../controllers/Users.js';
import { uploadPhoto } from '../controllers/PhotoProfile.js';

const router = express.Router();

router.get('/users/:limit&:page', getUsersTable);
router.get('/users/:id', getUserById);
router.get('/users', getUsers);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.patch('/users/:id/password', changePassword);
router.patch('/users/:id/photo', uploadPhoto);
router.delete('/users/:id', deleteUser);

export default router;