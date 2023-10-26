// Core Modules
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// Error Handler
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!');
    console.log(err.name, err.message);
    process.exit(1);
})

// Third-Party Modules
const mongoose = require('mongoose');

// Local Modules
const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => { console.log('DB connection successful!'); });

const port = process.env.PORT;

const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
