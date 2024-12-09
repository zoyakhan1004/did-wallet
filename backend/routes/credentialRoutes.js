const router = require('express').Router();
const Credential = require('../models/Credential');
const Notification = require('../models/Notification');
const authMiddleware = require('../middleware/authMiddleware');
const { fetchOnChainCredentials, fetchOffChainCredentials } = require('../services/didService'); // Import the service methods

// Issue credential (store off-chain details and create a notification)
router.post('/issue', authMiddleware, async (req, res) => {
    try {
        const { targetUserId, type, details } = req.body;

        const credential = new Credential({
            userId: targetUserId,
            type,
            details,
            issuerId: req.userId
        });
        await credential.save();

        // Create notification
        await new Notification({
            userId: targetUserId,
            type: 'credential_issued',
            message: `New ${type} credential issued`,
            relatedId: credential._id,
            onModel: 'Credential'
        }).save();

        res.status(201).json(credential);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user credentials (both on-chain and off-chain)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const credentials = await Credential.find({ userId: req.userId })
            .populate('issuerId', 'firstName lastName');

        // Fetch on-chain credentials (for each credential)
        for (let i = 0; i < credentials.length; i++) {
            const credential = credentials[i];
            if (credential.details && credential.details.cid) {
                // For off-chain credentials (IPFS), fetch the data
                credential.details = await fetchOffChainCredentials(credential.details.cid);
            } else if (credential.details && credential.details.credentialId) {
                // For on-chain credentials, fetch the data using the contract
                credential.details = await fetchOnChainCredentials(credential.details.credentialId);
            }
        }

        res.json(credentials);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Revoke credential
router.put('/:credentialId/revoke', authMiddleware, async (req, res) => {
    try {
        const credential = await Credential.findById(req.params.credentialId);

        if (!credential || credential.issuerId.toString() !== req.userId) {
            return res.status(404).json({ message: 'Credential not found' });
        }

        credential.status = 'revoked';
        await credential.save();

        // Create notification
        await new Notification({
            userId: credential.userId,
            type: 'credential_revoked',
            message: `Your ${credential.type} credential has been revoked`,
            relatedId: credential._id,
            onModel: 'Credential'
        }).save();

        res.json(credential);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch on-chain credentials (via contract address)
router.get('/on-chain/:credentialId', authMiddleware, async (req, res) => {
    try {
        const { credentialId } = req.params;
        const credential = await fetchOnChainCredentials(credentialId);
        res.json({ credential });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching on-chain credential' });
    }
});

// Fetch off-chain credentials (via IPFS CID)
router.get('/off-chain/:cid', authMiddleware, async (req, res) => {
    try {
        const { cid } = req.params;
        const credential = await fetchOffChainCredentials(cid);
        res.json({ credential });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching off-chain credential' });
    }
});

module.exports = router;
