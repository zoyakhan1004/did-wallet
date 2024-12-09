const Credential = require('../models/Credential');

const createCredential = async (req, res) => {
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

const getCredentials = async (req, res) => {
    try {
        const credentials = await Credential.find({ userId: req.userId });
        res.json(credentials);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createCredential,
    getCredentials
};