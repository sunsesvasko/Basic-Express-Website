const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async(req, res, next) => {
    const users = await User.find({});

    res.status(200).json({
        status: 'success',
        length: users.length,
        users: {
            users
        }
    })
});


exports.getUser = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) return next(new AppError('No user found with that ID', 404));

    res.status(200).json({
        status: 'success',
        user
    })
});

exports.createUser = catchAsync(async(req, res, next) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    });
});

exports.updateUser = catchAsync(async(req, res, next) => {
    const newUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!newUser) return next(new AppError('No user found with that ID', 404));

    res.status(200).json({
        status: 'success',
        user: newUser
    });
});

exports.deleteUser = async (req, res, next) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if(!deletedUser) return next(new AppError('No user found with that ID', 404));

    res.status(204).json({
        status: 'success',
        user: deletedUser
    });
}