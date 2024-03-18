# EventShuffle backend

The backend implements API for creating, listing, and voting suitable dates for different events.

## Installation

### Prerequisites

* Node.js (v20)

### Cloning

To install the application:
1. Clone the repository
2. Go to project root and install dependencies `npm ci`
3. Create .env file in the project root

### Environment variables

The application requires `.env` file in order to define a port and to connect to the MongoDB database. There should be two environment variables declared in the file, `PORT` and `MONGODB_URI`. The example file contents could be:

`PORT=3000`

`MONGODB_URI=mongodb+srv://{username}:{password}@cluster0.tiuvxsv.mongodb.net/eventShuffle?retryWrites=true&w=majority&appName=Cluster0`

The above mentioned mongodb url address includes placeholders for `username` and `password`. These should be replaced with credentials that have access rights to read and write into database. There is also a .env.example file provided as an example.

## Running the application

1. Run the application `npm start`

The application now listens requests on the localhost:PORT. I have used VS Code's REST Client extension, but there are a few different ways to send requests and test the application:

### Visual Studio Code: REST Client

Example requests (.rest) are provided in the ./requests/ folder that can be sent by installing REST Client extension in VS Code. Request can be sent by clicking "Send Request" link in the top of the file view.


### Postman

1. Install Postman: https://www.postman.com/
2. Follow instructions on how to send requests using Postman

### Command line

When the application is up and running, open a new command line window to send requests. This approach isn't the most optimal one, since it might be slower than others and the response format can be hard to read.

To list all events:

`curl -X GET http://localhost:3000/api/v1/event/list`

To add a new event:

`curl -X POST -H "Content-Type: application/json" -d '{ "name": "Test-Event-2", "dates": ["2024-02-18", "2024-02-05", "2024-02-02"] }' http://localhost:3000/api/v1/event`
