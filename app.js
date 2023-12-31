// === 0) Modules === //
const cors = require('cors');
const path = require('path');
const flash = require('connect-flash');
const multer = require('multer');
const express = require('express');
const session= require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const localStrategy = require('passport-local').Strategy;

const viewRouter = require('./routes/viewRoutes');
const userRouter = require('./routes/userRoutes');

const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Set view engine and views folder
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// === 1) Middlewares === //
// Implementing CORS & Handling options request
app.use(cors());
app.options('*', cors());
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// app.use(multer().array());
app.use(cookieParser());
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
// Handle Sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
}))
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Messages
app.use((req, res, next) => {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// === 2) Routes === //
app.use('/', viewRouter);
app.use('/api/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404);
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;