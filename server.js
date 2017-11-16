const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser').json();
const app = express();
const {DB} = require('./config');
const apiRouter = require('./routes/apiRouter');
mongoose.Promise = global.Promise;
const cors = require('cors');

app.use(cors());

mongoose.connect(DB, {useMongoClient: true});

app.use(bodyParser);

app.use('/api', apiRouter);

app.use('/*', (req, res, next) => {
    res.status(404).send({msg: "Page not found"});
  })
  
  app.use('/*', (err, req, res, next) => {
    if(err.type === 404) return res.status(404).send({msg: err.msg})
    next(err);
  })
  
  app.use((err, req, res, next) => {
    res.status(500).send({err});
  })

module.exports = app;