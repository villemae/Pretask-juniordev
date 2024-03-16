import mongoose from 'mongoose';

const vote = {
    date: Date,
    people: [String]
};

const eventSchema = new mongoose.Schema({
    name: String,
    dates: [Date],
    votes: {
        type: [vote],
        default: []
    },
    people_voted: {
        type: [String],
        default: []
    }
});

eventSchema.set('toJSON', {
    transform: (document, returnedObject, options) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.people_voted;
        if (options && options.justId) {
            delete returnedObject.dates;
            delete returnedObject.votes;
            delete returnedObject.name;
        }
        else if (options && options.results) {
            returnedObject.votes.forEach(vote => {
                delete vote._id;
            })
            returnedObject.suitableDates.forEach(date => {
                delete date._id;
            })
        }

        else if (options && options.compact) {
            delete returnedObject.dates;
            delete returnedObject.votes;
        }
        else if (options && options.deleteVoteIds) {
            returnedObject.votes.forEach(vote => {
                delete vote._id;
            });
        }
    }
});

const Event = mongoose.model('Event', eventSchema);

export { Event, vote };