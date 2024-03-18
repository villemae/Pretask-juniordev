import dotenv from 'dotenv';
dotenv.config();

const info = (...params) => {
    console.log('INFO:', ...params);
};

const error = (...params) => {
    console.error('ERROR:', ...params);
};

const debug = (...params) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('DEBUG:', ...params);
    }
};

export { info, error, debug };