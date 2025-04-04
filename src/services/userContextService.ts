
import { User } from '../types/user';
import { mockUsers } from '../types/user';

// Simulate the current logged-in user
// In a real app, this would come from your auth system
let currentUser: User | null = mockUsers.find(user => user.id === '6') || null;

export const getCurrentUser = (): User | null => {
  return currentUser;
};

export const setCurrentUser = (user: User | null): void => {
  currentUser = user;
};

export const isAdmin = (): boolean => {
  return currentUser?.type === 'admin';
};

export const isFlightReviewer = (): boolean => {
  return currentUser?.type === 'flight_reviewer';
};

export const getCurrentUserId = (): string | null => {
  return currentUser?.id || null;
};

// For testing, we can switch between different user types
export const switchToUserType = (type: 'admin' | 'flight_reviewer' | 'basic_user'): void => {
  const user = mockUsers.find(u => u.type === type);
  if (user) {
    currentUser = user;
  }
};
