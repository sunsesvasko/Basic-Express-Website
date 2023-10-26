const AppError = require('../utils/appError');

const sendErrorDev = (err, req, res) => {
    // A) API
    if(req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    };
    // B) RENDERED WEBSITE
    // Implement an error page
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development') sendErrorDev(err, req, res);
    else if(process.env.NODE_ENV === 'production') {
        // To be implemented later
    }

    next();
}