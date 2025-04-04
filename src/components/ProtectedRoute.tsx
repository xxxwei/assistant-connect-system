
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Always render the children without authentication checks
  return <>{children}</>;
};

export default ProtectedRoute;
