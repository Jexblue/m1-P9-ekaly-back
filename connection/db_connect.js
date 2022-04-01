const mongoose = require('mongoose');
require('dotenv').config();

//Set up default mongoose connection
const mongoUri = process.env.DATABASE_URL;
mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true}).then((db) => {
    console.log('Connected to Database');
});

//Bind connection to error event (to get notification of connection errors)
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));