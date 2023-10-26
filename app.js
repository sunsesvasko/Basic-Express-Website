// === 0) Modules === //
const path = require('path');
const http = require('http');
const express = require('express');

const viewRouter = require('./routes/viewRoutes');

const app = express();

// Set view engine and views folder
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// === 1) Middlewares === //
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// === 2) Routes === //
app.use('/', viewRouter);

module.exports = app;