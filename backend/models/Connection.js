const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    connectedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    type: {
        type: String,
        enum: ['issuer', 'verifier'],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Connection', connectionSchema);