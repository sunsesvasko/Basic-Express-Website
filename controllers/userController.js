const User = require('../models/userModel');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});

        res.status(200).json({
            status: 'success',
            length: users.length,
            users: {
                users
            }
        })
    } catch(err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            user
        })

    } catch(err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

exports.createUser = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
    } catch(err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const newUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            user: newUser
        })
    } catch(err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            user: deletedUser
        })
    } catch(err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}