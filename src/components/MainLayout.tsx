
import { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Typography } from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  DashboardOutlined,
  MessageOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  TrophyOutlined,
  ToolOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../services/authService';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <UserOutlined />,
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <SettingOutlined />,
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: 'Sign Out',
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="bg-customer-secondary border-r border-customer-border shadow-sm"
        width={256}
      >
        <div className="p-4 h-16 flex items-center justify-center border-b border-customer-border">
          {!collapsed ? (
            <Title level={4} className="m-0 text-customer-dark animate-fadeIn">
              Customer Service
            </Title>
          ) : (
            <Title level={4} className="m-0 text-customer-dark animate-fadeIn">
              CS
            </Title>
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          className="border-0 bg-transparent"
          items={[
            {
              key: '/dashboard',
              icon: <DashboardOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: '/tickets',
              icon: <MessageOutlined />,
              label: <Link to="/tickets">Tickets</Link>,
            },
            {
              key: '/customers',
              icon: <UserOutlined />,
              label: <Link to="/customers">Customers</Link>,
            },
            {
              key: '/orders',
              icon: <ShoppingCartOutlined />,
              label: <Link to="/orders">Orders</Link>,
            },
            {
              key: '/users',
              icon: <UsergroupAddOutlined />,
              label: <Link to="/users">Users</Link>,
            },
            {
              key: '/badges',
              icon: <TrophyOutlined />,
              label: <Link to="/badges">Badges</Link>,
            },
            {
              key: '/config',
              icon: <ToolOutlined />,
              label: 'Configuration',
              children: [
                {
                  key: '/config/parameters',
                  label: <Link to="/config/parameters">Parameters</Link>,
                },
                {
                  key: '/config/business-lines',
                  label: <Link to="/config/business-lines">Business Lines</Link>,
                }
              ]
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="p-0 bg-white border-b border-customer-border flex items-center justify-between pr-6">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggle}
            className="w-16 h-16 flex items-center justify-center border-0 text-lg"
          />
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div className="flex items-center cursor-pointer smooth-transition hover:bg-customer-secondary px-4 py-2 rounded-full">
              <span className="mr-3 hidden sm:inline text-customer-dark">Admin User</span>
              <Avatar icon={<UserOutlined />} className="bg-customer-primary" />
            </div>
          </Dropdown>
        </Header>
        <Content className="bg-customer-secondary">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
