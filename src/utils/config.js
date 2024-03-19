import dotenv from 'dotenv';
dotenv.config();

const ensureEnvVariable = (variableName, variable) => {
    if (variable === undefined) {
        throw new Error(
            `Required environment variable '${variableName}' is not defined.`
        );
    }
    return variable;
};

const PORT = ensureEnvVariable('PORT', process.env.PORT);

const MONGODB_URI = ensureEnvVariable('MONGODB_URI', process.env.MONGODB_URI);

export { PORT, MONGODB_URI};