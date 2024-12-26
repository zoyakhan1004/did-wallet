// src/services/networkService.js
import { apiConfig } from './config.js';

export const networkService = {
  async getNetworks() {
    try {
      const response = await fetch('https://8e61-110-227-204-245.ngrok-free.app/api/network/list', {
        headers: { 'Content-Type': 'application/json' },
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch networks');
    }
  },

  async addCustomNetwork(networkData) {
    try {
      const response = await fetch(`https://8e61-110-227-204-245.ngrok-free.app/api/network/add`, {
        method: 'POST',
        headers: {
          ...apiConfig.headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(networkData)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to add network');
    }
  },

  async deleteNetwork(chainId) {
    if (!chainId) {
      throw new Error('Invalid chainId provided for deletion');
    }

    console.log('Deleting network with chainId:', chainId);

    try {
      const response = await fetch(`https://8e61-110-227-204-245.ngrok-free.app/api/network/delete/${chainId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // Ensure proper headers are sent
        },
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Server responded with error:', error);
        throw new Error(error.message || `Failed to delete network with chainId ${chainId}`);
      }

      const result = await response.json();
      console.log('Delete successful:', result);
      return result;
    } catch (error) {
      console.error('Error during network deletion:', error.message);
      throw new Error('Failed to delete network. Please try again later.');
    }
  }

};
