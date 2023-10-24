import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import db from './config/Database.js';

import UserRoute from './routes/UserRoute.js';
import GanderRoute from './routes/GanderRoute.js';
import PendidikanRoute from './routes/PendidikanRoute.js';
import PenempatanRoute from './routes/PenempatanRoute.js';
import JabatanRoute from './routes/JabatanRoute.js';
import StatusPerkawinanRoute from './routes/StatusPerkawinanRoute.js';
import ContactEmergencyRoute from './routes/ContactEmergencyRoute.js';
import BankRoute from './routes/BankRoute.js';
import GolonganDarahRoute from './routes/GolonganDarahRoute.js';
import JamOperasionalRoute from './routes/JamOperasionalRoute.js';
import StatusRoute from './routes/StatusRoute.js';
import PelanggaranRoute from './routes/PelanggaranRoute.js';
import StatusInoutRoute from './routes/StatusInoutRoute.js';
import TipeAbsenRoute from './routes/TipeAbsenRoute.js';
import KoreksiRoute from './routes/KoreksiRoute.js';
import NotificationRoute from './routes/NotificationRoute.js';
import TipeNotificationRoute from './routes/TipeNotificationRoute.js';
import HistoryKoreksiRoute from './routes/HistoryKoreksiRoute.js';
import PeriodeRoute from './routes/PeriodeRoute.js';
import TipePendapatanRoute from './routes/TipePendapatanRoute.js';
import PendapatanRoute from './routes/PendapatanRoute.js';
import AuthRoute from './routes/AuthRoute.js';
import GroupRoute from './routes/GroupRoute.js';


const app = express();
dotenv.config();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db:db
});

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    // proxy: false,
    saveUninitialized: true,
    store:store,
    cookie: {
        // httpOnly: true,
        secure: 'auto',
        maxAge: 1000 * 60 * 60
    }
}));

app.use(cors({
    credentials: true,
    origin: process.env.LINK_FRONTEND
}));

app.use(express.json());
app.use(UserRoute);
app.use(GanderRoute);
app.use(PendidikanRoute);
app.use(PenempatanRoute);
app.use(JabatanRoute);
app.use(StatusPerkawinanRoute);
app.use(ContactEmergencyRoute);
app.use(BankRoute);
app.use(GolonganDarahRoute);
app.use(JamOperasionalRoute);
app.use(StatusRoute);
app.use(PelanggaranRoute);
app.use(StatusInoutRoute);
app.use(TipeAbsenRoute);
app.use(KoreksiRoute);
app.use(NotificationRoute);
app.use(TipeNotificationRoute);
app.use(HistoryKoreksiRoute);
app.use(PeriodeRoute);
app.use(TipePendapatanRoute);
app.use(PendapatanRoute);
app.use(AuthRoute);
app.use(GroupRoute);

// store.sync();

app.listen(process.env.PORT,()=>{
    console.log(`server running at port ${process.env.PORT}`)
});