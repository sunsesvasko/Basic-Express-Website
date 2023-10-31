const User = require('../models/userModel');
const sharp = require('sharp');
const multer = require('multer');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// multer
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')) cb(null, true);
    else cb(new AppError('Not an image! Please upload only images.', 400), false);
}

const upload = multer({
    storage: multerStorage,
    fileFIlter: multerFilter
})

// Account Settings
const filterObj = (obj, ...allowedFields) => {
    let newObj = {};
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) {
            newObj[el] = obj[el];
        }
    });

    return newObj;
}

exports.uploadUserPhoto = (req, res, next) => {
    upload.single('photo');
    next();
};

exports.resizeUserPhoto = catchAsync(async(req, res, next) => {
    if(!req.file) return next();
    console.log('Resizing Image...');

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer).resize(500, 500)
                                .toFormat('jpeg')
                                .jpeg({ quality: 90})
                                .toFile(`public/uploads/${req.file.filename}`);

    next();
});


exports.updateMe = catchAsync(async(req, res, next) => {
    console.log(req.file);
    console.log(req.body);

    // 1) Create error if user POSTs password data
    if(req.body.password || req.body.passwordConfirm) return next(new AppError('This route is not for password updates. Please use /updateMyPassword', 400));

    // 2) Filter out unwanted field names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');
    if(req.file) filteredBody.photo = req.file.filename;

    // 3) Update user document
    let updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: "success",
        data: {
            user: updatedUser
        }
    })
});

// CRUD
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

exports.deleteUser = catchAsync(async(req, res, next) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if(!deletedUser) return next(new AppError('No user found with that ID', 404));

    res.status(204).json({
        status: 'success',
        user: deletedUser
    });
});
