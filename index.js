import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import db from './config/Database.js';

import UserRoute from './routes/UserRoute.js';
import GanderRoute from './routes/GanderRoute.js';
import PendidikanRoute from './routes/PendidikanRoute.js';
import PenempatanRoute from './routes/PenempatanRoute.js';

const app = express();
dotenv.config();

// (async()=>{
//     await db.sync();
// })();

app.use(cors({
    credentials: true,
    origin: process.env.LINK_FRONTEND
}));

app.use(express.json());
app.use(UserRoute);
app.use(GanderRoute);
app.use(PendidikanRoute);
app.use(PenempatanRoute);

app.listen(process.env.PORT,()=>{
    console.log('server running at port 5000')
});