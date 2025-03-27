
import { message } from 'antd';

// Base API URL - replace with your actual API endpoint
export const API_BASE_URL = 'https://api.example.com';

// Default headers
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// Helper to get auth token from localStorage
export const getAuthToken = () => localStorage.getItem('auth_token');

// Helper to set auth token in localStorage
export const setAuthToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

// Helper to remove auth token from localStorage (logout)
export const removeAuthToken = () => {
  localStorage.removeItem('auth_token');
};

// Create headers with auth token if available
const createHeaders = (customHeaders = {}) => {
  const headers = { ...DEFAULT_HEADERS, ...customHeaders };
  const token = getAuthToken();
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Generic API request function
export const apiRequest = async (
  endpoint: string, 
  method: string = 'GET', 
  data: any = null, 
  customHeaders = {}
) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = createHeaders(customHeaders);
  
  const options: RequestInit = {
    method,
    headers,
    credentials: 'include',
  };

  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    
    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Handle 401 Unauthorized - token expired or invalid
      if (response.status === 401) {
        removeAuthToken();
        window.location.href = '/login'; // Redirect to login
        message.error('Session expired. Please log in again.');
      }
      
      throw {
        status: response.status,
        message: errorData.message || 'An error occurred',
        data: errorData
      };
    }
    
    // Parse JSON response if there is content
    if (response.status !== 204) { // No content
      return await response.json();
    }
    
    return null;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Convenience methods
export const get = (endpoint: string, customHeaders = {}) => 
  apiRequest(endpoint, 'GET', null, customHeaders);

export const post = (endpoint: string, data: any, customHeaders = {}) => 
  apiRequest(endpoint, 'POST', data, customHeaders);

export const put = (endpoint: string, data: any, customHeaders = {}) => 
  apiRequest(endpoint, 'PUT', data, customHeaders);

export const patch = (endpoint: string, data: any, customHeaders = {}) => 
  apiRequest(endpoint, 'PATCH', data, customHeaders);

export const del = (endpoint: string, customHeaders = {}) => 
  apiRequest(endpoint, 'DELETE', null, customHeaders);
