const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser').json();
const app = express();
const {DB} = require('./config');
const apiRouter = require('./routes');
mongoose.Promise = global.Promise;

mongoose.connect(DB, {useMongoClient: true});

app.use(cors());

app.use(bodyParser);

app.use('/api', apiRouter);
  
app.use((err, req, res, next) => {
  if (err.status === 400) return res.status(400).send({message: err.message});
  if (err.status === 404) return res.status(404).send({message: 'Page not found'});
  else return next(err);
});

app.use((err, req, res) => {
  res.status(500).send({err});
});

module.exports = app;