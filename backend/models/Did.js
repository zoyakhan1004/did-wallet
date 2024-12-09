const mongoose = require('mongoose');

const DIDSchema = new mongoose.Schema({
    did: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    networkConfig: {
        blockchain: {
            type: String,
            required: true
        },
        chainId: {
            type: Number,
            required: true
        },
        network: {
            type: String,
            required: true
        },
        rpcUrl: {
            type: String,
            required: true
        }
    },
    publicKey: {
        type: String,
        required: true
    },
    privateKey: {
        type: String,
        required: true
    },
    didDocument: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Add indexes for performance
DIDSchema.index({ userId: 1 });
DIDSchema.index({ did: 1 }, { unique: true });

module.exports = mongoose.model('DID', DIDSchema);