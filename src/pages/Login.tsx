
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Card, message, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { loginAdmin } from '../services/authService';

const { Title, Text } = Typography;

interface LocationState {
  from?: {
    pathname: string;
  };
}

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState;
  
  // Get the page they were trying to visit or default to dashboard
  const from = locationState?.from?.pathname || '/dashboard';

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    
    try {
      const response = await loginAdmin(values);
      
      // Show success message
      message.success('Login successful!');
      
      // Navigate to the page they were trying to visit
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error('Login error:', error);
      message.error(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-customer-light p-4 animate-fadeIn">
      <div className="max-w-md w-full">
        <div className="text-center mb-8 animate-slideUp">
          <Title level={2} className="text-customer-dark font-light">
            Customer Service System
          </Title>
          <Text className="text-customer-muted">
            Please login to access the admin panel
          </Text>
        </div>
        
        <Card 
          className="glass-panel border border-customer-border animate-slideUp" 
          style={{ animationDelay: '100ms' }}
        >
          <div className="text-center mb-6">
            <Title level={4} className="text-customer-dark">
              Admin Login
            </Title>
            <Divider className="my-4" />
          </div>
          
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
            className="animate-slideUp"
            style={{ animationDelay: '200ms' }}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input 
                prefix={<UserOutlined className="text-customer-muted" />} 
                placeholder="Email" 
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password 
                prefix={<LockOutlined className="text-customer-muted" />} 
                placeholder="Password" 
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item className="mb-0">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                icon={<LoginOutlined />}
                className="w-full rounded-md h-12 text-base shadow-md smooth-transition hover:shadow-lg"
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </Card>
        
        <div className="text-center mt-8 text-customer-muted animate-slideUp" style={{ animationDelay: '300ms' }}>
          <Text className="text-sm">
            &copy; {new Date().getFullYear()} Customer Service System. All rights reserved.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Login;
