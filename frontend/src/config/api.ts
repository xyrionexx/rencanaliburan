/**
 * API Configuration
 * Centralized API URL management for all fetch calls
 */

// Get API URL from environment variable or use default
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://api.borrowfy.site';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `http://localhost:8000/api/login/`,
  REGISTER: `http://localhost:8000/api/register/`,
  SYNC_USER: `http://localhost:8000/api/sync-user/`,
  CHECK_USER: (email: string) => `http://localhost:8000/api/users/check/?email=${email}`,
  
  // Destination endpoints
  DESTINASI: `${API_URL}/api/destinasi/`,
  DESTINASI_BY_ID: (id: string | number) => `${API_URL}/api/destinasi/${id}/`,
  
  // Plan endpoints
  RENCANA: `${API_URL}/api/rencana/`,
};

export default API_URL;
