const path = require('path');
const http = require('http');
const dotenv = require('dotenv');
const express = require('express');
const nodemailer = require('nodemailer');

dotenv.config({ path: './config.env' });
const port = process.env.PORT;

const app = express();

// === Middlewares === //

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// === Routes === //
app.get('/', (req, res) => {

    res.status(200).send('Hello World');
})

// === Server === //
app.listen(port);
console.log(`Server is running on port ${port}`);