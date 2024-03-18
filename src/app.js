import express from 'express';
import { eventsRouter } from './controllers/events.js';
import * as Middleware from './utils/middleware.js';

function createApp() {
    const app = express();
    app.use(express.json());

    app.use('/api/v1', eventsRouter);
    app.use(Middleware.unknownEndpoint);
    return app;
}

export default createApp;