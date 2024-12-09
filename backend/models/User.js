const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [false, 'Password is required'],
            minlength: 6
        },
        otp: {
            code: {
                type: String,
                required: false
            },
            expiresAt: {
                type: Date,
                required: false
            }
        },
    },
    { timestamps: true }
);

// Hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err);
    }
});

// Ensure the model definition doesn't conflict during hot reloading
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
