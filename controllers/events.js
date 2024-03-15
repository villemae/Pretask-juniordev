import express from 'express';
import { Event } from '../models/eventModel.js';
import * as Logger from '../utils/logger.js';

const eventsRouter = express.Router();

eventsRouter.get('/list', (req, res) => {
    Event
        .find({})
        .then(events => {
            res.json(events);
        })
        .catch(error => {
            Logger.error(error.message);
        })
})

eventsRouter.post('/', (req, res) => {
    Logger.info(req.body);
    const event = new Event(req.body);

    event
        .save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(error => {
            Logger.error(error.message);
        })
})

export { eventsRouter };