require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');

const { default: dbMessages } = require('./dbMessages');

const Messages = require('./dbMessages');
const Pusher = require('pusher');

const cors = require('cors');

// app config
const app = express();
const port = process.env.PORT || 8080;

// makes a RealTime use of MongoDB
const pusher = new Pusher({
    appId: '1094231',
    key: '5a408a6fb35686c708d0',
    secret: '476d3886be90cea47bab',
    cluster: 'us2',
    useTLS: true,
  });

// middleware
app.use(express.json());

// CORS library instead of defining headers
app.use(cors());

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

// api routes
app.get('/', (req, res) => 
    res.status(200).send('hello world!')
    );

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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('mern-whatsapp/build'));
}

// listen
app.listen(port, () => 
    console.log(`Listening on localhost:${port}`)
    );