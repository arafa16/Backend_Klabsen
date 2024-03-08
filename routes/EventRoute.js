import express from 'express';
import { createEvents, deleteEvents, getEvents, getEventsById, getEventsTable, updateEvents } from '../controllers/Event.js';

const router = express.Router();

router.get('/events', getEvents);
router.get('/events/:id', getEventsById);
router.get('/events/table/:limit&:page', getEventsTable);
router.post('/events', createEvents);
router.patch('/events/:id', updateEvents);
router.delete('/events/:id', deleteEvents);

export default router;