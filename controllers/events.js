import express from 'express';
import { Event } from '../models/eventModel.js';
import * as Logger from '../utils/logger.js';

const eventsRouter = express.Router();

eventsRouter.get('/list', async (req, res) => {
    try {
        const data = await Event.find({});
        
        // reformat data to be in required form
        const events = { "events": [] };
        data.forEach(event => {
            events.events.push(event);
        });
        res.status(200).json(events);

    } catch(error) {
        Logger.error(error.message);
        res.status(500);
    }
});


eventsRouter.post('/', async (req, res) => {
    try {
        const event = new Event(req.body);
        const result = await event.save();
        res.status(201).json(result._id);
    } catch(error) {
        Logger.error(error.message);
        res.status(500);
    }
});


eventsRouter.get('/:id', async (req, res) => {
    try {
        Logger.info("Show an event");
        const event = await Event.findById(req.params.id);
        res.status(200).json(event);
        //TODO: reformat response
    } catch(error) {
        Logger.error(error.message);
    }
});


eventsRouter.post('/:id/vote', (req, res) => {
    Logger.info('Add votes to an event');
    //TODO
});


eventsRouter.get('/:id/results', (req, res) => {
    Logger.info('Responds with dates that are suitable for all participants.');
    //TODO
});



export { eventsRouter };