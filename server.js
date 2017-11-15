if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser').json();
const app = express();
const config = require('./config');
const db = config.DB[process.env.NODE_ENV] || process.env.DB;
const apiRouter = require('./routes/apiRouter');
mongoose.Promise = global.Promise;

mongoose.connect(db, {useMongoClient: true})
.then(() => {
    console.log('successfully connected to ', db);
})
.catch((err) => {
    console.log('connection failed', err);
})

app.use(bodyParser);

app.use('/api', apiRouter);

app.use('/*', (req, res) => {
    res.status(404).send({msg: 'Page not found'});
})

app.use('/*', (req, res, next) => {
    if(err.type === 404) {
        return res.status(err.status).send({msg: 'Page not found'});   
    }
    next(err);          
})

app.use((err, req, res, next) => {
    res.status(500).send({msg: 'Server Error'});
})

module.exports = app;