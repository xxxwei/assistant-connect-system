
import { post, setAuthToken, removeAuthToken, getAuthToken } from '../utils/api';

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
  try {
    const response = await post('/admin/login', credentials);
    
    // Store the token in localStorage
    if (response && response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = (): void => {
  removeAuthToken();
  window.location.href = '/login';
};

export const checkAuth = (): boolean => {
  return !!getAuthToken();
};

export const getCurrentUser = async () => {
  try {
    // Use the stored token to fetch current user data
    const response = await post('/admin/me', {});
    return response.user;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};
