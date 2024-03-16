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
    }
});

eventSchema.set('toJSON', {
    transform: (document, returnedObject, options) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        if (options && options.justId) {
            delete returnedObject.dates;
            delete returnedObject.votes;
            delete returnedObject.name;
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