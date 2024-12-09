const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    details: {
        type: Object,
        required: true
    },
    issuerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['active', 'revoked'],
        default: 'active'
    }
}, { timestamps: true });

module.exports = mongoose.model('Credential', credentialSchema);
