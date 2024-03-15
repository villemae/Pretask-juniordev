import { MONGODB_URI } from './config.js';
import mongoose from 'mongoose';
import * as Logger from './logger.js';

mongoose.set('strictQuery', false);

Logger.info(`connecting to ${MONGODB_URI}`);

const connectDB = async () => {
    mongoose.connect(MONGODB_URI)
    .then(() => {
        Logger.info('connected to MongoDB');
    })
    .catch(error => {
        Logger.error('error connecting to MongoDB', error.message);
    })
}

export default connectDB;