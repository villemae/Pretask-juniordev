import mongoose from 'mongoose';
import * as chai from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server';
import createApp from '../src/app.js';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const { expect } = chai;

let mongo;
let app;

// Connect to test database before running the tests
before(async () => {
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri);
    console.log('Connected to test database');
    app = createApp();
    console.log('App created');
});
// testit
// after disconnect + stop

describe('List all events', () => {
    it('dummy', () => {
        expect(true).to.equal(true);
    });

    // There seems to be a problem with importing chai-http, needs investigation
    /*it('should return empty list before anything is added', async () => {
        const res = await chai.request(app).get('/event/list');
        chai.expect(res).to.have.status(200);
    });*/

});

// Disconnect and close the database after running the tests
after(async () => {
    await mongoose.disconnect();
    await mongo.stop();
    console.log('Test database disconnected');
});