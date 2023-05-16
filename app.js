const express = require('express');
const path = require('path');
const client = require('./db/client');

client.connect();
const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', require('./api'));

app.use('/', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  try {
    res.status(404).send("Sorry, can't find that! :/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message);
});

module.exports = app;
