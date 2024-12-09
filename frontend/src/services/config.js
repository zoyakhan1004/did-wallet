// src/services/config.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const apiConfig = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
};