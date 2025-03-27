
import { useState } from 'react';
import { Card, Form, Input, Select, Button, Upload, message, Typography } from 'antd';
import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

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

// Sample placeholder images
const placeholderImages = [
  'https://source.unsplash.com/photo-1488590528505-98d2b5aba04b',
  'https://source.unsplash.com/photo-1518770660439-4636190af475',
  'https://source.unsplash.com/photo-1461749280684-dccba630e2f6',
  'https://source.unsplash.com/photo-1486312338219-ce68d2c6f44d',
  'https://source.unsplash.com/photo-1581091226825-a6a2a5aee158',
];

const BadgeCreate = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleSubmit = async (values: any) => {
    setLoading(true);
    console.log('Form values:', {
      ...values,
      image_url: imageUrl || placeholderImages[0]
    });
    
    // Simulate API call
    setTimeout(() => {
      message.success('Badge created successfully');
      setLoading(false);
      navigate('/badges');
    }, 1000);
  };

  // For demo purposes, just randomly select a placeholder image
  const handleSelectRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * placeholderImages.length);
    setImageUrl(placeholderImages[randomIndex]);
    form.setFieldsValue({ image_url: placeholderImages[randomIndex] });
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Link to="/badges" className="mr-4">
          <Button icon={<ArrowLeftOutlined />} type="text" />
        </Link>
        <Title level={2} className="m-0">Create Badge</Title>
      </div>

      <Card className="max-w-3xl mx-auto">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            badge_type: 0,
            badge_name: '',
            description: '',
            image_url: '',
          }}
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
                
                <div className="space-y-2">
                  <Button 
                    type="default" 
                    onClick={handleSelectRandomImage}
                    block
                  >
                    Select Random Image
                  </Button>
                  
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
                      Upload Image
                    </Button>
                  </Upload>
                </div>
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
                    Create Badge
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

export default BadgeCreate;
