// src/services/authMiddlewareService.js
import { apiConfig } from './config';

export const authMiddlewareService = {
  async login(credentials) {
    try {
      const response = await fetch(`https://917b-110-227-204-245.ngrok-free.app/api/authMiddleware/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...apiConfig.headers
        },
        body: JSON.stringify(credentials)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  async register(userData) {
    try {
      const response = await fetch(`https://917b-110-227-204-245.ngrok-free.app/authMiddleware/register`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify(userData)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Registration failed');
    }
  },

  async verifyOTP(data) {
    try {
      const response = await fetch(`https://917b-110-227-204-245.ngrok-free.app/authMiddleware/verify`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      throw new Error('OTP verification failed');
    }
  }
};