import express from 'express';
import { Event, vote } from '../models/eventModel.js';
import * as Logger from '../utils/logger.js';
import * as Formatter from '../utils/formatter.js';

const eventsRouter = express.Router();

// Show all events
eventsRouter.get('/list', async (req, res) => {
    try {
        const docs = await Event.find({});
        const events = Formatter.formatGetAll(docs);
        res.status(200).json(events);

    } catch(error) {
        Logger.error(error.message);
        res.status(500);
    }
});


// Add a new event
eventsRouter.post('/', async (req, res) => {
    try {
        const data = new Event(req.body);
        const doc = await data.save();
        const id = Formatter.formatAddNew(doc);
        Logger.info(`Event added with id ${id}`);
        res.status(201).json(id);
    } catch(error) {
        Logger.error(error.message);
        res.status(500);
    }
});


// Show an event with given id
eventsRouter.get('/:id', async (req, res) => {
    try {
        Logger.debug("Show an event");
        const doc = await Event.findById(req.params.id);
        const event = Formatter.formatShowEvent(doc);
        res.status(200).json(event);
    } catch(error) {
        Logger.error(error.message);
        res.status(500);
    }
});


// Add votes to an event
eventsRouter.post('/:id/vote', async (req, res) => {
    try {
        Logger.debug('Add votes to an event');

        // Check that request body is not empty
        if (req.body.name === null || req.body.votes === null) {
            throw new Error('Invalid request body');
        }
        const event = await Event.findById(req.params.id);

        // Check that voted dates are actually available for the event
        const valid_dates = [];
        req.body.votes.forEach((date) => {
            const date_obj = new Date(date);
            event.dates.forEach((value) => {
                if (String(date_obj) === String(value)) {
                    valid_dates.push(date_obj);
                }
            })
        })
        if (valid_dates.length === 0) {
            throw new Error('The event doesn\'t have available dates for given votes')
        }

        // Update the votes information of the event
        valid_dates.forEach((date) => {
            var match = false;

            event.votes.forEach((vote) => {
                // If someone has already voted the date, add name to list
                if (String(vote.date) === String(date)) {
                    // Prevent duplicate names
                    if (!vote.people.includes(req.body.name)) {
                        vote.people.push(req.body.name);
                    }
                    match = true;
                }
            })
            // If nobody has voted the date yet, add it
            if (!match) {
                const vote = {date: date, people: [req.body.name]};
                event.votes.push(vote);
            }
        })
        const doc = await event.save();
        const result = Formatter.formatAddVotes(doc);
        res.status(200).json(result);
    } catch(error) {
        Logger.error(error.message);
        res.status(500);
    }
});


// Show dates of a given event that are suitable for all participants 
eventsRouter.get('/:id/results', (req, res) => {
    Logger.debug('Responds with dates that are suitable for all participants.');
    //TODO
});



export { eventsRouter };