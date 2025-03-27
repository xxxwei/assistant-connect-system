
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { checkAuth } from '../services/authService';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = checkAuth();
    
    if (isAuthenticated) {
      // If authenticated, redirect to dashboard
      navigate('/dashboard');
    } else {
      // If not authenticated, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spin size="large" tip="Redirecting..." />
    </div>
  );
};

export default Index;
