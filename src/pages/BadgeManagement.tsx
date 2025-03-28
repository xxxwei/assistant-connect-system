
import { useState } from 'react';
import { Button, Input, Select, Table, Tag, Space, Card, Typography } from 'antd';
import { PlusOutlined, SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined, SendOutlined, FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

// Badge types
const badgeTypes = [
  { value: 0, label: 'Achievement', color: 'blue' },
  { value: 1, label: 'Certification', color: 'green' },
  { value: 2, label: 'Award', color: 'purple' },
  { value: 3, label: 'Recognition', color: 'orange' },
];

// Mock data for badges
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

const BadgeManagement = () => {
  const [searchText, setSearchText] = useState('');
  const [badgeTypeFilter, setBadgeTypeFilter] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filter badges based on search and filter
  const filteredBadges = mockBadges.filter(badge => {
    const matchesSearch = searchText 
      ? badge.badge_name.toLowerCase().includes(searchText.toLowerCase()) || 
        badge.description.toLowerCase().includes(searchText.toLowerCase())
      : true;
    
    const matchesType = badgeTypeFilter !== null 
      ? badge.badge_type === badgeTypeFilter
      : true;
    
    return matchesSearch && matchesType;
  });

  // Table columns
  const columns = [
    {
      title: 'Badge',
      dataIndex: 'image_url',
      key: 'image',
      render: (imageUrl: string) => (
        <img 
          src={imageUrl} 
          alt="Badge" 
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
        />
      ),
      width: 70,
    },
    {
      title: 'Name',
      dataIndex: 'badge_name',
      key: 'badge_name',
      sorter: (a: any, b: any) => a.badge_name.localeCompare(b.badge_name),
    },
    {
      title: 'Type',
      dataIndex: 'badge_type',
      key: 'badge_type',
      render: (type: number) => {
        const badge = badgeTypes.find(b => b.value === type);
        return badge ? <Tag color={badge.color}>{badge.label}</Tag> : '-';
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      width: 300,
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      width: 100,
    },
    {
      title: 'Distributed',
      dataIndex: 'distributed_count',
      key: 'distributed_count',
      sorter: (a: any, b: any) => a.distributed_count - b.distributed_count,
      width: 100,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="small">
          <Link to={`/badges/details/${record.id}`}>
            <Button icon={<EyeOutlined />} size="small" type="text" />
          </Link>
          <Link to={`/badges/edit/${record.id}`}>
            <Button icon={<EditOutlined />} size="small" type="text" />
          </Link>
          <Link to={`/badges/distribute/${record.id}`}>
            <Button 
              icon={<SendOutlined />} 
              size="small" 
              type="text" 
              title="Distribute badge" 
            />
          </Link>
          <Button 
            icon={<DeleteOutlined />} 
            size="small" 
            type="text" 
            danger
            onClick={() => console.log('Delete badge', record.id)}
          />
        </Space>
      ),
      width: 150,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="m-0">Badge Management</Title>
        <div className="flex gap-2">
          <Link to="/badges/create">
            <Button type="primary" icon={<PlusOutlined />}>Create Badge</Button>
          </Link>
          <Link to="/badges/form-menu">
            <Button icon={<FormOutlined />}>Form Menu</Button>
          </Link>
        </div>
      </div>

      <Card className="mb-6">
        <div className="flex flex-wrap gap-4">
          <Input
            placeholder="Search badges by name or description"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="w-full md:w-64"
          />
          <Select
            placeholder="Filter by badge type"
            allowClear
            className="w-full md:w-48"
            onChange={value => setBadgeTypeFilter(value)}
          >
            {badgeTypes.map(type => (
              <Option key={type.value} value={type.value}>{type.label}</Option>
            ))}
          </Select>
        </div>
      </Card>

      <Card>
        <Table
          dataSource={filteredBadges}
          columns={columns}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize,
            total: filteredBadges.length,
            onChange: page => setCurrentPage(page),
            showSizeChanger: false,
          }}
        />
      </Card>
    </div>
  );
};

export default BadgeManagement;
