'use strict'

// Principles of least surprise and separation of concerns violated
const express = require('express');
const createError = require('http-errors');
const indexRoutes = require('./routes/index');

const app = express();

// Routes
app.use('/', indexRoutes);

// Error Handling
app.use((req, res, next) => {
  if (req.method !== 'GET') {
    next(createError(405));
    return;
  }
  next(createError(404));
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
})

module.exports = app;
