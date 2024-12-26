const Connection = require('../models/Connection.js');
const Credential = require('../models/Credential.js');

exports.createConnection = async (req, res) => {
    try {
        const { connectedUserId } = req.body;
        const newConnection = new Connection({
            userId: req.userId,
            connectedUserId,
            status: 'pending'
        });
        await newConnection.save();
        res.json(newConnection);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getConnections = async (req, res) => {
    try {
        const connections = await Connection.find({
            $or: [{ userId: req.userId }, { connectedUserId: req.userId }]
        }).populate('userId connectedUserId', 'firstName lastName email');
        res.json(connections);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createCredential = async (req, res) => {
    try {
        const { name, value, type } = req.body;
        const newCredential = new Credential({
            userId: req.userId,
            name,
            value,
            type
        });
        await newCredential.save();
        res.json(newCredential);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getCredentials = async (req, res) => {
    try {
        const credentials = await Credential.find({ userId: req.userId });
        res.json(credentials);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
