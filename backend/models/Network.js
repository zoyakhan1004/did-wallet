// models/Network.js
const mongoose = require('mongoose');

const networkSchema = new mongoose.Schema({
    chainId: {
        type: String,
        required: true,
        unique: true
    },
    blockchain: {
        type: String,
        required: true
    },
    network: {
        type: String,
        required: true
    },
    rpcUrl: {
        type: String,
        required: true
    },
    stateContractAddress: {
        type: String,
        required: false
    },
    networkFlag: {
        type: String,
        required: false
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }
}, { timestamps: true });

module.exports = mongoose.model('Network', networkSchema);

