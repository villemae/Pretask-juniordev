import  createApp from './app.js';
import { PORT } from './utils/config.js';
import connectDB from './utils/db.js';
import * as Logger from './utils/logger.js';

await connectDB();

const app = createApp();

app.listen(PORT, () => {
    Logger.info(`Server running on port ${PORT}`);
});
