
import { useState, useEffect } from 'react';
import { Card, Button, Typography, Spin, Table, Space, Avatar, Tag, Input, message, Checkbox, Alert } from 'antd';
import { ArrowLeftOutlined, SearchOutlined, UserOutlined, SendOutlined } from '@ant-design/icons';
import { Link, useParams, useNavigate } from 'react-router-dom';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const { Title } = Typography;

// Badge types
const badgeTypes = [
  { value: 0, label: 'Achievement', color: 'blue' },
  { value: 1, label: 'Certification', color: 'green' },
  { value: 2, label: 'Award', color: 'purple' },
  { value: 3, label: 'Recognition', color: 'orange' },
];

// Mock data for badges (same as in other files)
const mockBadges = Array.from({ length: 20 }).map((_, index) => {
  const badgeType = badgeTypes[Math.floor(Math.random() * badgeTypes.length)];
  return {
    id: index + 1,
    badge_type: badgeType.value,
    badge_name: `Badge ${index + 1}`,
    description: `This is a description for badge ${index + 1}. It showcases the purpose and achievement represented by this badge.`,
    image_url: `https://source.unsplash.com/random/100x100?sig=${index}`,
    created_at: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    distributed_count: Math.floor(Math.random() * 50),
  };
});

// Mock data for users
const mockUsers = Array.from({ length: 50 }).map((_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  department: ['Support', 'Sales', 'Engineering', 'Marketing'][Math.floor(Math.random() * 4)],
  role: ['Admin', 'Manager', 'Agent', 'Supervisor'][Math.floor(Math.random() * 4)],
}));

const BadgeDistribute = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [badge, setBadge] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedUserKeys, setSelectedUserKeys] = useState<React.Key[]>([]);
  const [distributingBadge, setDistributingBadge] = useState(false);
  
  useEffect(() => {
    // Simulate fetching badge data
    setTimeout(() => {
      const badgeId = parseInt(id as string);
      const foundBadge = mockBadges.find(b => b.id === badgeId);
      
      if (foundBadge) {
        setBadge(foundBadge);
        setUsers(mockUsers);
      } else {
        navigate('/badges');
      }
      
      setLoading(false);
    }, 500);
  }, [id, navigate]);

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchText) || 
    user.email.toLowerCase().includes(searchText) ||
    user.department.toLowerCase().includes(searchText) ||
    user.role.toLowerCase().includes(searchText)
  );

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedUserKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: selectedUserKeys,
    onChange: onSelectChange,
  };

  const handleDistributeBadge = () => {
    if (selectedUserKeys.length === 0) {
      message.warning('Please select at least one user');
      return;
    }

    setDistributingBadge(true);
    
    // Simulate API call to distribute badges
    setTimeout(() => {
      message.success(`Badge "${badge.badge_name}" distributed to ${selectedUserKeys.length} users`);
      setDistributingBadge(false);
      navigate(`/badges/details/${id}`);
    }, 1500);
  };

  const userColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <div className="flex items-center">
          <Avatar icon={<UserOutlined />} className="mr-2" />
          {text}
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      render: (department: string) => {
        let color;
        switch (department) {
          case 'Support': color = 'blue'; break;
          case 'Sales': color = 'green'; break;
          case 'Engineering': color = 'purple'; break;
          case 'Marketing': color = 'orange'; break;
          default: color = 'default';
        }
        return <Tag color={color}>{department}</Tag>;
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        let color;
        switch (role) {
          case 'Admin': color = 'red'; break;
          case 'Manager': color = 'gold'; break;
          case 'Supervisor': color = 'lime'; break;
          case 'Agent': color = 'cyan'; break;
          default: color = 'default';
        }
        return <Tag color={color}>{role}</Tag>;
      },
    },
  ];

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Link to={`/badges/details/${id}`} className="mr-4">
          <Button icon={<ArrowLeftOutlined />} type="text" />
        </Link>
        <Title level={2} className="m-0">Distribute Badge</Title>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <Card>
            <div className="flex flex-col items-center">
              <img 
                src={badge.image_url} 
                alt={badge.badge_name} 
                className="w-40 h-40 rounded-full object-cover shadow-lg mb-4"
              />
              <Title level={3} className="mb-1">{badge.badge_name}</Title>
              <Tag color={badgeTypes.find(t => t.value === badge.badge_type)?.color}>
                {badgeTypes.find(t => t.value === badge.badge_type)?.label}
              </Tag>
              <p className="mt-4 text-gray-600">{badge.description}</p>
              
              <div className="w-full mt-6">
                <Alert 
                  message="Distribution Information" 
                  description={
                    <div className="mt-2">
                      <p>
                        <strong>Selected Users:</strong> {selectedUserKeys.length}
                      </p>
                      <p className="mt-2">
                        <strong>Previously Distributed:</strong> {badge.distributed_count}
                      </p>
                    </div>
                  }
                  type="info"
                  showIcon
                />
                
                <Button 
                  type="primary" 
                  icon={<SendOutlined />} 
                  size="large"
                  block
                  className="mt-4"
                  onClick={handleDistributeBadge}
                  disabled={selectedUserKeys.length === 0}
                  loading={distributingBadge}
                >
                  Distribute Badge ({selectedUserKeys.length})
                </Button>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="lg:w-2/3">
          <Card className="mb-4">
            <Input 
              prefix={<SearchOutlined />}
              placeholder="Search users by name, email, department or role"
              onChange={e => handleSearch(e.target.value)}
              className="w-full"
            />
          </Card>
          
          <Card title={`Select Users (${selectedUserKeys.length} selected)`}>
            <Table 
              rowSelection={rowSelection}
              dataSource={filteredUsers}
              columns={userColumns}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BadgeDistribute;
