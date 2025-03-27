
import { setAuthToken, removeAuthToken, getAuthToken } from '../utils/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const loginAdmin = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  // Simulate API call success
  // In a real app, this would make an actual API request
  
  // Create a mock successful response
  const mockResponse: LoginResponse = {
    token: 'mock-jwt-token-xyz123456789',
    user: {
      id: '1',
      name: 'Admin User',
      email: credentials.email,
      role: 'admin'
    }
  };
  
  // Store the token in localStorage
  setAuthToken(mockResponse.token);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockResponse;
};

export const logout = (): void => {
  removeAuthToken();
  window.location.href = '/login';
};

export const checkAuth = (): boolean => {
  return !!getAuthToken();
};

export const getCurrentUser = async () => {
  // Simulate fetching current user data
  const token = getAuthToken();
  
  if (!token) {
    return null;
  }
  
  // Create mock user data
  const mockUser = {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin'
  };
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockUser;
};
