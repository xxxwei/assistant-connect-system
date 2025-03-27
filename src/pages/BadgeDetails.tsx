
import { useState, useEffect } from 'react';
import { Card, Button, Descriptions, Spin, Typography, Table, Space, Tag, Divider, Avatar } from 'antd';
import { ArrowLeftOutlined, EditOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useParams, useNavigate } from 'react-router-dom';

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
    updated_at: new Date(Date.now() - Math.floor(Math.random() * 5000000000)).toISOString(),
    distributed_count: Math.floor(Math.random() * 50),
  };
});

// Mock data for badge recipients
const mockUsers = Array.from({ length: 50 }).map((_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  awarded_at: new Date(Date.now() - Math.floor(Math.random() * 5000000000)).toISOString(),
  department: ['Support', 'Sales', 'Engineering', 'Marketing'][Math.floor(Math.random() * 4)],
}));

const BadgeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [badge, setBadge] = useState<any>(null);
  const [recipients, setRecipients] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching badge data
    setTimeout(() => {
      const badgeId = parseInt(id as string);
      const foundBadge = mockBadges.find(b => b.id === badgeId);
      
      if (foundBadge) {
        setBadge(foundBadge);
        
        // Get random users who have this badge
        const badgeRecipients = mockUsers
          .slice(0, Math.floor(Math.random() * 15) + 5)
          .map(user => ({ ...user, badge_id: badgeId }));
        
        setRecipients(badgeRecipients);
      } else {
        navigate('/badges');
      }
      
      setLoading(false);
    }, 500);
  }, [id, navigate]);

  const recipientColumns = [
    {
      title: 'User',
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
      title: 'Awarded Date',
      dataIndex: 'awarded_at',
      key: 'awarded_at',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <Spin size="large" tip="Loading badge details..." />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Link to="/badges" className="mr-4">
          <Button icon={<ArrowLeftOutlined />} type="text" />
        </Link>
        <Title level={2} className="m-0">Badge Details</Title>
        <div className="ml-auto space-x-2">
          <Link to={`/badges/edit/${id}`}>
            <Button icon={<EditOutlined />} type="default">
              Edit Badge
            </Button>
          </Link>
          <Link to={`/badges/distribute/${id}`}>
            <Button icon={<SendOutlined />} type="primary">
              Distribute Badge
            </Button>
          </Link>
        </div>
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
              <Divider />
              <p className="text-gray-600">{badge.description}</p>
            </div>
          </Card>
        </div>
        
        <div className="lg:w-2/3 flex flex-col">
          <Card className="mb-6">
            <Descriptions title="Badge Information" bordered column={{ xs: 1, sm: 2, md: 3 }}>
              <Descriptions.Item label="ID">{badge.id}</Descriptions.Item>
              <Descriptions.Item label="Created">
                {new Date(badge.created_at).toLocaleDateString()}
              </Descriptions.Item>
              <Descriptions.Item label="Last Updated">
                {new Date(badge.updated_at).toLocaleDateString()}
              </Descriptions.Item>
              <Descriptions.Item label="Recipients">{recipients.length}</Descriptions.Item>
            </Descriptions>
          </Card>
          
          <Card title="Badge Recipients" style={{ flex: 1 }}>
            <Table 
              dataSource={recipients} 
              columns={recipientColumns}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BadgeDetails;
