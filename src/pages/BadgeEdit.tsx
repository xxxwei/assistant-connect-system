
import { useState, useEffect } from 'react';
import { Card, Form, Input, Select, Button, Upload, message, Typography, Spin } from 'antd';
import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// Badge types
const badgeTypes = [
  { value: 0, label: 'Achievement' },
  { value: 1, label: 'Certification' },
  { value: 2, label: 'Award' },
  { value: 3, label: 'Recognition' },
];

// Mock data for badges (same as in BadgeManagement.tsx)
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

const BadgeEdit = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    // Simulate fetching badge data
    setTimeout(() => {
      const badgeId = parseInt(id as string);
      const badge = mockBadges.find(b => b.id === badgeId);
      
      if (badge) {
        form.setFieldsValue({
          badge_name: badge.badge_name,
          badge_type: badge.badge_type,
          description: badge.description,
          image_url: badge.image_url,
        });
        setImageUrl(badge.image_url);
      } else {
        message.error('Badge not found');
        navigate('/badges');
      }
      
      setInitialLoading(false);
    }, 500);
  }, [id, form, navigate]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    console.log('Form values:', {
      ...values,
      image_url: imageUrl
    });
    
    // Simulate API call
    setTimeout(() => {
      message.success('Badge updated successfully');
      setLoading(false);
      navigate('/badges');
    }, 1000);
  };

  if (initialLoading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <Spin size="large" tip="Loading badge..." />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Link to="/badges" className="mr-4">
          <Button icon={<ArrowLeftOutlined />} type="text" />
        </Link>
        <Title level={2} className="m-0">Edit Badge</Title>
      </div>

      <Card className="max-w-3xl mx-auto">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <Card className="text-center">
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt="Badge Preview" 
                    className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Badge Image</span>
                  </div>
                )}
                
                <Upload 
                  accept="image/*"
                  showUploadList={false}
                  beforeUpload={(file) => {
                    // In a real app, you'd upload to server
                    // For demo, create an object URL
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      if (e.target?.result) {
                        setImageUrl(e.target.result as string);
                      }
                    };
                    reader.readAsDataURL(file);
                    return false;
                  }}
                >
                  <Button icon={<UploadOutlined />} block>
                    Change Image
                  </Button>
                </Upload>
              </Card>
            </div>
            
            <div className="md:w-2/3">
              <Form.Item
                label="Badge Name"
                name="badge_name"
                rules={[{ required: true, message: 'Please enter a badge name' }]}
              >
                <Input placeholder="Enter badge name" />
              </Form.Item>
              
              <Form.Item
                label="Badge Type"
                name="badge_type"
                rules={[{ required: true, message: 'Please select a badge type' }]}
              >
                <Select placeholder="Select badge type">
                  {badgeTypes.map(type => (
                    <Option key={type.value} value={type.value}>{type.label}</Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please enter a description' }]}
              >
                <TextArea 
                  placeholder="Enter badge description" 
                  rows={4} 
                  maxLength={300}
                  showCount
                />
              </Form.Item>
              
              <Form.Item
                name="image_url"
                hidden
              >
                <Input />
              </Form.Item>
              
              <Form.Item className="mb-0">
                <div className="flex justify-end space-x-2">
                  <Button onClick={() => navigate('/badges')}>
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Update Badge
                  </Button>
                </div>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default BadgeEdit;
