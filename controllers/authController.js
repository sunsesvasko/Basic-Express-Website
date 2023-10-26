const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const { promisify } = require('util');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id) || signToken(user.id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

exports.signup = catchAsync(async(req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    newUser.password = undefined;

    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async(req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are input
    if(!email || !password) return next(new AppError('Please provide email and password!', 400));
    // Check if the user exists or the password is correct
    const user = await User.findOne({email}).select('+password');
    if(!user || !await user.correctPassword(password, user.password)) return next(new AppError('Wrong credentials!', 401));

    createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
}

exports.protect = catchAsync(async(req, res, next) => {
    let token;

    // 1) Getting token and checking if it's there
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) token = req.headers.authorization.split(' ')[1];
    else if(req.cookies.jwt) token = req.cookies.jwt;   
    
    if(!token) return next(new AppError('You aren\'t logged in! Please log in to get access.'), 401);

    // 2) Verifying token (since jwt.verify retuns a callback, I'm using promisify which comes from the util npm package to make it return a promise instead)
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists (I can use decoded.id, because the payload I give when signing a token is the user's ID)
    const user = await User.findById(decoded.id);
    if(!user) return next(new AppError('This user doesn\'t exist.', 401));

    // 4) To be implemented... Check if user changed password after the token was issued

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = user;
    res.locals.user = user;
    next();
});