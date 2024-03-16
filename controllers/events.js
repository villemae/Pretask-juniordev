import express from 'express';
import { Event, vote } from '../models/eventModel.js';
import * as Logger from '../utils/logger.js';
import * as Formatter from '../utils/formatter.js';

const eventsRouter = express.Router();

// Show all events
eventsRouter.get('/event/list', async (req, res) => {
    try {
        const docs = await Event.find({});
        const events = Formatter.formatGetAll(docs);
        res.status(200).json(events);

    } catch(error) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
});


// Add a new event
eventsRouter.post('/event/', async (req, res) => {
    try {
        Logger.debug(req.body.name);
        Logger.debug(req.body.dates);
        Logger.debug(req.body.people_voted);
        // Prevent faulty request body
        if (!req.body.name || !req.body.dates || req.body.people_voted || req.body.votes) {
            throw new Error('Faulty request body');
        }
        const data = new Event(req.body);
        const doc = await data.save();
        const id = Formatter.formatAddNew(doc);
        Logger.info(`Event added with id ${id}`);
        res.status(201).json(id);
    } catch(error) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
});


// Show an event with given id
eventsRouter.get('/event/:id', async (req, res) => {
    try {
        Logger.debug("Show an event");
        const doc = await Event.findById(req.params.id);
        const event = Formatter.formatShowEvent(doc);
        res.status(200).json(event);
    } catch(error) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
});


// Add votes to an event
eventsRouter.post('/event/:id/vote', async (req, res) => {
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
        // Add voting person's name to database to keep track of all participants
        if (!event.people_voted.includes(req.body.name)) {
            event.people_voted.push(req.body.name);
        }
        const doc = await event.save();
        const result = Formatter.formatAddVotes(doc);
        res.status(200).json(result);
    } catch(error) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
});


// Show dates of a given event that are suitable for all participants 
eventsRouter.get('/event/:id/results', async (req, res) => {
    Logger.debug('Responds with dates that are suitable for all participants.');
    try {
        const doc = await Event.findById(req.params.id);
        const all_participants = doc.people_voted.length;
        Logger.debug(all_participants);
        const suitable_dates = [];
        doc.votes.forEach((date) => {
            if (date.people.length === all_participants) {
                suitable_dates.push(date);
            }
        })
        if (suitable_dates.length === 0) {
            res.status(404).json('No suitable dates found');
        } else {
        const result = Formatter.formatShowSuitable(doc, suitable_dates);
        res.status(200).json(result);
        }

    } catch(error) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
});



export { eventsRouter };