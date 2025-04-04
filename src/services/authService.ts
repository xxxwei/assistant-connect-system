
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
  // Always return a successful login
  const mockResponse: LoginResponse = {
    token: 'mock-jwt-token-xyz123456789',
    user: {
      id: '1',
      name: 'Admin User',
      email: credentials.email || 'admin@example.com',
      role: 'admin'
    }
  };
  
  // Store the token in localStorage
  setAuthToken(mockResponse.token);
  
  return mockResponse;
};

export const logout = (): void => {
  removeAuthToken();
  window.location.href = '/login';
};

// Always return true for authentication checks
export const checkAuth = (): boolean => {
  return true;
};

export const getCurrentUser = async () => {
  // Create mock user data
  const mockUser = {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin'
  };
  
  return mockUser;
};
