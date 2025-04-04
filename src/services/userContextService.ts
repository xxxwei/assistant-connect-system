
import { User } from '../types/user';
import { mockUsers } from '../types/user';

// For demo purposes, we'll simulate that we're always admin
let currentUser: User | null = mockUsers.find(user => user.type === 'admin') || null;

export const getCurrentUser = (): User | null => {
  return currentUser;
};

export const setCurrentUser = (user: User | null): void => {
  currentUser = user;
};

// Always return true for admin
export const isAdmin = (): boolean => {
  return true;
};

export const isFlightReviewer = (): boolean => {
  return true;
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
