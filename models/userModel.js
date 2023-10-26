const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name']
    },
    email: {
        type: String,
        required: [true, 'A user must have an email.'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: {
        type: String,
        default: 'default.jpeg'
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
        minlength: [8, 'A password must have at least 8 characters'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Password must be confirmed.'],
        validate: {
            // This only works on .create() and .save()!!!
            validator: function(el) {
                return el === this.password ? true : false;
            },
            message: 'Passwords are not the same!'
        }
    }
});

// === MIDDLEWARE === //

// Hashing the user's password before it's stored in the database, so it's more secure and removing the passwordConfirm field because it's not necessary once it's done its job 
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;

    next();
});

// === METHODS === //
userSchema.methods.correctPassword = async function(canditatePassword, userPassword) {
    return await bcrypt.compare(canditatePassword, userPassword); 
}


const User = mongoose.model('User', userSchema);

module.exports = User;