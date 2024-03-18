import * as Logger from './logger.js';

const formatGetAll = (data) => {
    Logger.debug(data);
    const events = { 'events': [] };
    data.forEach(event => {
        const compact = event.toJSON({ compact: true });
        events.events.push(compact);
    });
    Logger.debug(events);
    return events;
};

const formatAddNew = (data) => {
    Logger.debug(data);
    const event = data.toJSON({ justId: true });
    return event.id;
};

const formatShowEvent = (data) => {
    Logger.debug(data);
    return data.toJSON();    
};

const formatAddVotes = (data) => {
    Logger.debug(data);
    return data.toJSON( { deleteVoteIds: true });
};

const formatShowSuitable = (doc, dates) => {
    Logger.debug(doc, dates);
    const compact = doc.toJSON({ compact: true, deleteVoteIds: true });
    const result = {...compact, 'suitableDates': dates};
    return result;
};

export { 
    formatGetAll,
    formatAddNew,
    formatShowEvent,
    formatAddVotes,
    formatShowSuitable
};