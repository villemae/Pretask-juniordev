import { MONGODB_URI } from './config.js';
import mongoose from 'mongoose';
import * as Logger from './logger.js';

mongoose.set('strictQuery', false);

Logger.info(`connecting to ${MONGODB_URI}`);

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        Logger.info('connected to MongoDB');
    } catch(error) {
        throw new Error(`MongoDB connection error: ${error}`);
    }
};

export default connectDB;