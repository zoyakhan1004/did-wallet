const Connection = require('../models/Connection');

const createConnection = async (req, res) => {
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

const getConnections = async (req, res) => {
    try {
        const connections = await Connection.find({
            $or: [{ userId: req.userId }, { connectedUserId: req.userId }]
        }).populate('userId connectedUserId', 'firstName lastName email');
        res.json(connections);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createConnection,
    getConnections
};