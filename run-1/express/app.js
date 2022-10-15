'use strict'

// Principles of least surprise and separation of concerns violated
const express = require('express');
const createError = require('http-errors');
const indexRoutes = require('./routes/index');
const helloRoutes = require('./routes/hello');

const app = express();

// Configuring all the behavior of the app happens almost exclusively with .use()
// Multiple functions can be registered here.
// Middleware pattern
app.use('/', indexRoutes);
app.use('/hello', helloRoutes);

app.use((req, res, next) => {
  if (req.method !== 'GET') {
    next(createError(405));
    return;
  }

  next(createError(404));
});

// the next param is an extra param that can be passed when using express.
// Next is an error-first callback function
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
