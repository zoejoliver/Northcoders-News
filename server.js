if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const db = config.DB[process.env.NODE_ENV] || process.env.DB;
const apiRouter = require('./routes/apiRouter');
mongoose.Promise = Promise;

mongoose.connect(db, {useMongoClient: true})
.then(() => {
    console.log('successfully connected to ', db);
})
.catch((err) => {
    console.log('connection failed', err);
})

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/../public"));
app.use('/api', apiRouter);

module.exports = app;