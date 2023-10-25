// === 0) Modules === //
const path = require('path');
const http = require('http');
const dotenv = require('dotenv');
const express = require('express');
const nodemailer = require('nodemailer');

dotenv.config({ path: './config.env' });
const port = process.env.PORT;

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
app.get('/', (req, res) => {

    res.status(200).render('index', {
        title: 'Welcome'
    });
})

app.get('/about', (req, res) => {

    res.status(200).render('about')
})

// === 3) Server === //
app.listen(port);
console.log(`Server is running on port ${port}`);