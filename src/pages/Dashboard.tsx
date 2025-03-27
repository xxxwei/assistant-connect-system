
import { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Typography, Button, Spin } from 'antd';
import { 
  UserOutlined, 
  MessageOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined 
} from '@ant-design/icons';
import { get } from '../utils/api';

const { Title } = Typography;

interface DashboardStats {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  customers: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        // This is where you'd make a real API call using the token in header
        const data = await get('/admin/dashboard/stats');
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        // For demo purposes, set dummy data
        setStats({
          totalTickets: 156,
          openTickets: 23,
          resolvedTickets: 133,
          customers: 87
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" tip="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto animate-fadeIn">
      <div className="mb-8 animate-slideUp">
        <Title level={2} className="text-customer-dark font-light">
          Dashboard Overview
        </Title>
        <p className="text-customer-muted">
          Welcome to your customer service dashboard
        </p>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="glass-panel animate-slideUp hover:shadow-md smooth-transition" hoverable>
            <Statistic
              title="Total Tickets"
              value={stats?.totalTickets}
              prefix={<MessageOutlined />}
              valueStyle={{ color: '#0070f3' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card className="glass-panel animate-slideUp hover:shadow-md smooth-transition" hoverable style={{ animationDelay: '100ms' }}>
            <Statistic
              title="Open Tickets"
              value={stats?.openTickets}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#ff9500' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card className="glass-panel animate-slideUp hover:shadow-md smooth-transition" hoverable style={{ animationDelay: '200ms' }}>
            <Statistic
              title="Resolved Tickets"
              value={stats?.resolvedTickets}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#34c759' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card className="glass-panel animate-slideUp hover:shadow-md smooth-transition" hoverable style={{ animationDelay: '300ms' }}>
            <Statistic
              title="Customers"
              value={stats?.customers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#5856d6' }}
            />
          </Card>
        </Col>
      </Row>

      <Card className="mt-8 glass-panel animate-slideUp" style={{ animationDelay: '400ms' }}>
        <Title level={4} className="font-light mb-4">
          Quick Actions
        </Title>
        <Row gutter={16}>
          <Col>
            <Button type="primary" className="mr-4 mb-4">
              Create New Ticket
            </Button>
            <Button className="mr-4 mb-4">
              View All Tickets
            </Button>
            <Button className="mb-4">
              Customer Management
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Dashboard;
