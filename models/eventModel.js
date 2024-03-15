import mongoose from "mongoose";

const vote = {
    date: Date,
    people: [String]
};

const eventSchema = new mongoose.Schema({
    name: String,
    dates: [Date],
    votes: [vote]
});

eventSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.dates;
    }
});

const Event = mongoose.model('Event', eventSchema);

export { Event };