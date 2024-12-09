const axios = require('axios');
const { validationResult } = require('express-validator');
const Network = require('../models/Network');

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
                // console.log("🚀 ~ exports.addNetwork= ~ response.data.result:", response.data.result)
                // console.log("🚀 ~ exports.addNetwork= ~ response.data:", response.data)
                return res.status(400).json({ message: 'Invalid RPC URL: No valid response from endpoint' });
            }

            // Optional: Confirm chain ID matches the response
            const returnedChainId = parseInt(response.data.result, 16);
            console.log("🚀 ~ exports.addNetwork= ~ returnedChainId:", returnedChainId)
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
console.log("🚀 ~ exports.addNetwork= ~ addNetwork:", addNetwork)


// Delete a network
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
  

// Retrieve available networks
exports.getNetworks = async (req, res) => {
    try {
        const networks = await Network.find();
        res.status(200).json(networks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
