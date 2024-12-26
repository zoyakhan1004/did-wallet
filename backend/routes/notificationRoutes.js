const express = require('express');
const Notification = require('../models/Notification');
const authMiddleware = require('../middleware/authMiddleware');
const axios = require('axios');

const router = express.Router();

// Get all notifications
router.get('/', authMiddleware, async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.userId })
            .sort('-createdAt')
            .populate('relatedId');
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Mark notification as read
router.put('/:notificationId/read', authMiddleware, async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: req.params.notificationId, userId: req.userId },
            { read: true },
            { new: true }
        );
        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete notification
router.delete('/:notificationId', authMiddleware, async (req, res) => {
    try {
        await Notification.findOneAndDelete({
            _id: req.params.notificationId,
            userId: req.userId
        });
        res.json({ message: 'Notification deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
