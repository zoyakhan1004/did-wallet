const router = require('express').Router();
const Connection = require('../models/Connection');
const Notification = require('../models/Notification');
const authMiddleware = require('../middleware/authMiddleware');

// Send connection request
router.post('/request', authMiddleware, async (req, res) => {
    try {
        const { targetUserId, type } = req.body;

        // Check if connection already exists
        const existingConnection = await Connection.findOne({
            userId: req.userId,
            connectedUserId: targetUserId
        });

        if (existingConnection) {
            return res.status(400).json({ message: 'Connection already exists' });
        }

        // Create new connection
        const connection = new Connection({
            userId: req.userId,
            connectedUserId: targetUserId,
            type
        });
        await connection.save();

        // Create notification for target user
        await new Notification({
            userId: targetUserId,
            type: 'connection_request',
            message: 'New connection request received',
            relatedId: connection._id,
            onModel: 'Connection'
        }).save();

        res.status(201).json(connection);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all connections
router.get('/', authMiddleware, async (req, res) => {
    try {
        const connections = await Connection.find({
            $or: [{ userId: req.userId }, { connectedUserId: req.userId }]
        }).populate('userId connectedUserId', 'firstName lastName email');
        res.json(connections);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Accept/Reject connection request
router.put('/:connectionId', authMiddleware, async (req, res) => {
    try {
        const { status } = req.body;
        const connection = await Connection.findById(req.params.connectionId);

        if (!connection || connection.connectedUserId.toString() !== req.userId) {
            return res.status(404).json({ message: 'Connection not found' });
        }

        connection.status = status;
        await connection.save();

        // Create notification for requester
        await new Notification({
            userId: connection.userId,
            type: 'connection_request',
            message: `Connection request ${status}`,
            relatedId: connection._id,
            onModel: 'Connection'
        }).save();

        res.json(connection);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;