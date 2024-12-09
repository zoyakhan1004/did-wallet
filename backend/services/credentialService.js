const { ethers } = require('ethers');
const ipfsClient = require('ipfs-http-client');

// Setup Ethereum provider (e.g., Infura or local node)
const provider = new ethers.JsonRpcProvider('YOUR_INFURA_OR_LOCAL_PROVIDER_URL');

// Contract ABI and address of the Issuer node's contract
const contractABI = [
  {
    "constant": true,
    "inputs": [{"name": "credentialId", "type": "string"}],
    "name": "getCredential",
    "outputs": [{"name": "credential", "type": "string"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
const contractAddress = '0xYourIssuerContractAddress';

// Initialize IPFS client (if using IPFS for off-chain data)
const ipfs = ipfsClient.create({ url: 'https://ipfs.infura.io:5001/api/v0' });

// Function to fetch on-chain credentials
async function fetchOnChainCredentials(credentialId) {
  try {
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const credential = await contract.getCredential(credentialId); // Adjust this based on your contract's method
    return credential;
  } catch (error) {
    throw new Error('Error fetching on-chain credentials: ' + error.message);
  }
}

// Function to fetch off-chain credentials (e.g., from IPFS)
async function fetchOffChainCredentials(cid) {
  try {
    const file = await ipfs.cat(cid);
    const credential = JSON.parse(file.toString());
    return credential;
  } catch (error) {
    throw new Error('Error fetching off-chain credentials: ' + error.message);
  }
}

module.exports = { fetchOnChainCredentials, fetchOffChainCredentials };
