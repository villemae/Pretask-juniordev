import express from 'express';
import cors from 'cors';
import { eventsRouter } from './controllers/events.js';
import * as Middleware from './utils/middleware.js';

function createApp() {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use('/api/v1', eventsRouter);
    app.use(Middleware.unknownEndpoint);
    return app;
}

export default createApp;