const router = require('express').Router();
const Network = require('../models/Network'); // Assuming you have a Network model
const axios = require('axios');
// Add a new custom network
// Utility function to parse chain ID
const parseChainId = (chainIdStr) => {
    // Ensure the chain ID is in hexadecimal format
    const hexChainId = chainIdStr.startsWith('0x') 
        ? chainIdStr 
        : `0x${chainIdStr}`;
    
    return parseInt(hexChainId, 16);
};

// Add a new custom network
router.post('/add', async (req, res) => {
    try {
        const { 
            chainId, 
            blockchain, 
            network, 
            rpcUrl, 
            stateContractAddress, 
            networkFlag 
        } = req.body;

        // Validate required fields
        if (!rpcUrl || !chainId) {
            return res.status(400).json({ 
                message: 'RPC URL and Chain ID are required',
                fields: { rpcUrl, chainId }
            });
        }

        // Check if the network already exists
        const existingNetwork = await Network.findOne({ chainId });
        if (existingNetwork) {
            return res.status(400).json({ 
                message: 'Chain ID already exists', 
                existingNetwork 
            });
        }

        // Validate the RPC URL
        try {
            // Try eth_chainId method first
            const ethChainIdPayload = {
                jsonrpc: '2.0',
                method: 'eth_chainId',
                params: [],
                id: 1
            };

            const ethResponse = await axios.post(rpcUrl, ethChainIdPayload, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000 // 5 second timeout
            });

            // Fallback to net_version if eth_chainId fails
            if (!ethResponse.data || !ethResponse.data.result) {
                const netVersionPayload = {
                    jsonrpc: '2.0',
                    method: 'net_version',
                    params: [],
                    id: 1
                };

                const netResponse = await axios.post(rpcUrl, netVersionPayload, {
                    headers: { 'Content-Type': 'application/json' },
                    timeout: 5000
                });

                if (!netResponse.data || !netResponse.data.result) {
                    return res.status(400).json({ 
                        message: 'Invalid RPC URL: No valid response from endpoint',
                        details: {
                            ethChainIdResponse: ethResponse.data,
                            netVersionResponse: netResponse.data
                        }
                    });
                }
            }

            // Validate chain ID
            let returnedChainId;
            if (ethResponse.data && ethResponse.data.result) {
                returnedChainId = parseChainId(ethResponse.data.result);
            }

            // Compare chain IDs
            const providedChainId = Number(chainId);
            if (returnedChainId && returnedChainId !== providedChainId) {
                return res.status(400).json({ 
                    message: 'Chain ID does not match the RPC endpoint',
                    providedChainId,
                    returnedChainId
                });
            }

        } catch (error) {
            console.error('RPC Validation Error:', error);
            return res.status(400).json({ 
                message: 'Invalid RPC URL: Unable to reach the endpoint',
                error: error.message,
                details: error.response ? error.response.data : null
            });
        }

        // Save the network to the database
        const newNetwork = new Network({ 
            chainId, 
            blockchain, 
            network, 
            rpcUrl, 
            stateContractAddress, 
            networkFlag 
        });

        const savedNetwork = await newNetwork.save();

        res.status(201).json({ 
            message: 'Network added successfully', 
            network: savedNetwork 
        });

    } catch (error) {
        console.error('Error adding network:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
});
// Delete a custom network
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNetwork = await Network.findByIdAndDelete(id);
        if (!deletedNetwork) {
            return res.status(404).json({ message: 'Network not found' });
        }

        res.json({ message: 'Network deleted successfully' });
    } catch (error) {
        console.error('Error deleting network:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// List all networks
router.get('/list', async (req, res) => {
    try {
        const networks = await Network.find();
        res.json(networks);
    } catch (error) {
        console.error('Error fetching networks:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;