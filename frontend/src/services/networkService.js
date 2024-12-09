// src/services/networkService.js
import { apiConfig } from './config';

export const networkService = {
  async getNetworks() {
    try {
        const response = await fetch('https://917b-110-227-204-245.ngrok-free.app/api/network/list', {
            headers: { 'Content-Type': 'application/json' },
        });
        return await response.json();
    } catch (error) {
        throw new Error('Failed to fetch networks');
      }
  },

  async addCustomNetwork(networkData) {
    try {
      const response = await fetch(`https://917b-110-227-204-245.ngrok-free.app/api/network/add`, {
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

  async deleteNetwork(id) {
    try {
      const response = await fetch(`https://917b-110-227-204-245.ngrok-free.app/api/network/delete/${id}`, {
        method: 'DELETE',
        headers: apiConfig.headers,
      });
      
      // Log the response status code
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to delete network: ${errorData.message || 'Unknown error'}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Failed to delete network:", error.message);
      throw new Error('Failed to delete network');
    }
  }
  
};
