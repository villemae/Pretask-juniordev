import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: String,
    dates: [Date]
})

const Event = mongoose.model('Event', eventSchema);

export { Event };