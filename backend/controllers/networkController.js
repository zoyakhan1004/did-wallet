const Connection = require('../models/Connection.js');
const Credential = require('../models/Credential.js');
const axios = require('axios');
const { validationResult } = require('express-validator');
const Network = require('../models/Network.js');

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

exports.addNetwork = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { chainId, rpcUrl } = req.body;

        // Check if the network already exists
        const existingNetwork = await Network.findOne({ chainId });
        if (existingNetwork) {
            return res.status(400).json({ message: 'Chain ID already exists' });
        }

        // Validate the RPC URL
        try {
            const payload = {
                jsonrpc: '2.0',
                method: 'eth_chainId',
                params: [],
                id: 1
            };

            const response = await axios.post(rpcUrl, payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.data || !response.data.result) {
                return res.status(400).json({ message: 'Invalid RPC URL: No valid response from endpoint' });
            }

            // Optional: Confirm chain ID matches the response
            const returnedChainId = parseInt(response.data.result, 16);
            if (returnedChainId !== chainId) {
                return res.status(400).json({ message: 'Chain ID does not match the RPC endpoint' });
            }
        } catch (error) {
            return res.status(400).json({ message: 'Invalid RPC URL: Unable to reach the endpoint' });
        }

        // Save the network
        const network = new Network(req.body);
        const savedNetwork = await network.save();
        res.status(201).json(savedNetwork);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteNetwork = async (req, res) => {
    try {
        const { id } = req.params;  // This is the network's unique '_id'
        const deletedNetwork = await Network.findByIdAndDelete(id);
        if (!deletedNetwork) {
            return res.status(404).json({ message: 'Network not found' });
        }
        res.status(200).json({ message: 'Network deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getNetworks = async (req, res) => {
    try {
        const networks = await Network.find();
        res.status(200).json(networks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
