require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

const folderRouter = require('./folder-router.js');
const notesRouter = require('./note-router.js');

// set up middleware
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

// Router middleware
app.use('/folder', folderRouter);
app.use('/notes', notesRouter);

// request handling
app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

// error handling
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  let response;
  console.log(error.message);
  if (NODE_ENV === 'production') {
    response = { error: { message: 'Server error' } };
  } else {
    response = { message: error.message, error };
  }

  res.status(500).json(response);
};

app.use(errorHandler);

// the bottom line, literally
module.exports = app;
