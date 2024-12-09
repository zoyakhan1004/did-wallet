import { apiConfig } from './config';

export const credentialService = {
  // Fetch all credentials (both on-chain and off-chain)
  async getAllCredentials() {
    try {
      const response = await fetch(`https://917b-110-227-204-245.ngrok-free.app/credential`, {
        headers: apiConfig.headers
      });
      const credentials = await response.json();

      // After fetching, handle both on-chain and off-chain credentials
      for (let i = 0; i < credentials.length; i++) {
        const credential = credentials[i];

        if (credential.details && credential.details.cid) {
          // For off-chain credentials (IPFS), fetch the data
          credential.details = await this.fetchOffChainCredential(credential.details.cid);
        } else if (credential.details && credential.details.credentialId) {
          // For on-chain credentials, fetch the data using the contract
          credential.details = await this.fetchOnChainCredential(credential.details.credentialId);
        }
      }

      return credentials;
    } catch (error) {
      throw new Error('Failed to fetch credentials: ' + error.message);
    }
  },

  // Add a new credential (issue a credential to a user)
  async addCredential(credentialData) {
    try {
      const response = await fetch(`https://917b-110-227-204-245.ngrok-free.app/credential/issue`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify(credentialData)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to add credential: ' + error.message);
    }
  },

  // Fetch off-chain credential (via IPFS CID)
  async fetchOffChainCredential(cid) {
    try {
      const response = await fetch(`https://917b-110-227-204-245.ngrok-free.app/credential/off-chain/${cid}`, {
        headers: apiConfig.headers
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch off-chain credential: ' + error.message);
    }
  },

  // Fetch on-chain credential (via credentialId)
  async fetchOnChainCredential(credentialId) {
    try {
      const response = await fetch(`https://917b-110-227-204-245.ngrok-free.app/credential/on-chain/${credentialId}`, {
        headers: apiConfig.headers
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch on-chain credential: ' + error.message);
    }
  }
};
