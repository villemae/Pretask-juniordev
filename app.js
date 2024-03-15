import express from 'express';
import cors from 'cors';
import { eventsRouter } from './controllers/events.js';

function createApp() {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use('/api/v1/event', eventsRouter);
    return app;
}

export default createApp;