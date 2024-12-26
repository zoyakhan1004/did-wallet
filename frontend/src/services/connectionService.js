// src/services/connectionService.js
import { apiConfig } from './config';

export const connectionService = {
  async getConnections() {
    try {
      const response = await fetch(`https://8e61-110-227-204-245.ngrok-free.app/connection`, {
        headers: apiConfig.headers
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch connections');
    }
  },

  async createConnection(connectionData) {
    try {
      const response = await fetch(`https://8e61-110-227-204-245.ngrok-free.app/connection`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify(connectionData)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to create connection');
    }
  }
};