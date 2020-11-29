require('dotenv').config();

const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

const { default: dbMessages } = require('./mern-whatsapp/dbMessages');

const Messages = require('./mern-whatsapp/dbMessages');
const Pusher = require('pusher');

const cors = require('cors');

// app config
const app = express();
const PORT = process.env.PORT || 5000;

// makes a RealTime use of MongoDB
const pusher = new Pusher({
    appId: process.env.REACT_APP_PUSHER_ID,
    key: process.env.REACT_APP_PUSHER_KEY,
    secret: process.env.REACT_APP_PUSHER_SECRET,
    cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    useTLS: true,
  });

// middleware
app.use(express.json());

// CORS library instead of defining headers
app.use(cors());

if (process.env.NODE_ENV === "production") {
	app.use(express.static("./mern-whatsapp/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "./mern-whatsapp/build", "index.html"));
	});
}

// MongoDB config
const connection_url = process.env.CONNECTION_URL;

mongoose.connect(process.env.MONGO_URI || connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection

db.once('open', () => {
    console.log('DB connected');

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change) => {
        console.log('change');

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
            {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            }
            );
        } else {
            console.log('Error triggering Pusher')
        }
    });
});

// api routes (remove or comment out before sending to production)
// app.get('/', (req, res) => 
//     res.status(200).send('hello world!')
//     );

// set to false in Postman for testing
app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

// set to true in Postman for testing
app.post('/messages/new', (req, res) => {
    const dbMessages = req.body;

    Messages.create(dbMessages, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(`new message created: \n ${data}`)
        }
    })
})

// listen
app.listen(process.env.PORT, () => 
    console.log(`Listening on localhost:${PORT}`)
);