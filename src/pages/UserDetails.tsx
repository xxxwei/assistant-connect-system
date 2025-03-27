
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Input, Select, Divider, Form, message, Empty, Spin } from 'antd';
import { ArrowLeftIcon, Edit2Icon, BadgeIcon, Save, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge as BadgeType, UserWithBadges } from '@/types/badge';

// Mock user data (would come from an API in a real app)
const mockUsers = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    department: 'Customer Service',
    role: 'admin',
    badges: [
      { id: 1, badge_type: 1, badge_name: 'Customer Service Excellence', description: 'Awarded for exceptional customer service', image_url: '/placeholder.svg', created_at: '2023-05-15', distributed_count: 15 },
      { id: 3, badge_type: 2, badge_name: 'Team Player', description: 'Awarded for excellent teamwork', image_url: '/placeholder.svg', created_at: '2023-07-10', distributed_count: 8 }
    ]
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    department: 'Sales',
    role: 'agent',
    badges: [
      { id: 2, badge_type: 3, badge_name: 'Sales Champion', description: 'Achieved outstanding sales results', image_url: '/placeholder.svg', created_at: '2023-06-20', distributed_count: 5 }
    ]
  },
  { 
    id: 3, 
    name: 'Robert Johnson', 
    email: 'robert.j@example.com', 
    department: 'Technical Support',
    role: 'agent',
    badges: [] 
  },
];

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserWithBadges | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const [selectedBadge, setSelectedBadge] = useState<BadgeType | null>(null);
  const [badgeDialogOpen, setBadgeDialogOpen] = useState(false);
  
  // Fetch user data
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundUser = mockUsers.find(u => u.id === Number(id));
      if (foundUser) {
        setUser(foundUser);
        form.setFieldsValue(foundUser);
      }
      setLoading(false);
    }, 500);
  }, [id, form]);

  // Handle form submission
  const handleSubmit = (values: any) => {
    // In a real app, this would be an API call
    setUser(prev => {
      if (!prev) return null;
      return { ...prev, ...values };
    });
    setEditing(false);
    message.success('User information updated successfully');
  };

  // Handle cancel edit
  const handleCancel = () => {
    if (user) {
      form.setFieldsValue(user);
    }
    setEditing(false);
  };

  // Handle badge click
  const handleBadgeClick = (badge: BadgeType) => {
    setSelectedBadge(badge);
    setBadgeDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[50vh]">
        <Spin size="large" tip="Loading user details..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Button 
            icon={<ArrowLeftIcon className="h-4 w-4" />} 
            onClick={() => navigate('/users')}
            className="mr-4"
          >
            Back to Users
          </Button>
          <h1 className="text-2xl font-light">User Not Found</h1>
        </div>
        <Card>
          <Empty description="The requested user could not be found" />
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button 
            icon={<ArrowLeftIcon className="h-4 w-4" />} 
            onClick={() => navigate('/users')}
            className="mr-4"
          >
            Back to Users
          </Button>
          <h1 className="text-2xl font-light">User Details</h1>
        </div>
        {!editing ? (
          <Button 
            type="primary" 
            icon={<Edit2Icon className="h-4 w-4" />} 
            onClick={() => setEditing(true)}
          >
            Edit User
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button 
              icon={<X className="h-4 w-4" />} 
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              icon={<Save className="h-4 w-4" />} 
              onClick={() => form.submit()}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* User Information */}
      <Card className="mb-6 shadow-sm">
        <Form
          form={form}
          layout="vertical"
          disabled={!editing}
          onFinish={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Please enter the user name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Please enter the email address' },
                { type: 'email', message: 'Please enter a valid email address' }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="department"
              label="Department"
              rules={[{ required: true, message: 'Please select a department' }]}
            >
              <Select
                options={[
                  { value: 'Customer Service', label: 'Customer Service' },
                  { value: 'Sales', label: 'Sales' },
                  { value: 'Technical Support', label: 'Technical Support' },
                  { value: 'Marketing', label: 'Marketing' },
                  { value: 'Human Resources', label: 'Human Resources' },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="role"
              label="User Role"
              rules={[{ required: true, message: 'Please select a role' }]}
            >
              <Select
                options={[
                  { value: 'admin', label: 'Admin' },
                  { value: 'supervisor', label: 'Supervisor' },
                  { value: 'agent', label: 'Agent' },
                ]}
              />
            </Form.Item>
          </div>
        </Form>
      </Card>

      {/* User Badges */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-light flex items-center">
          <BadgeIcon className="mr-2 h-5 w-5" />
          Badges
        </h2>
      </div>
      
      <Card className="shadow-sm">
        {user.badges.length === 0 ? (
          <Empty 
            description="This user hasn't earned any badges yet" 
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.badges.map(badge => (
              <Card 
                key={badge.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleBadgeClick(badge)}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 mr-4 flex items-center justify-center bg-gray-100 rounded-full overflow-hidden">
                    <img 
                      src={badge.image_url} 
                      alt={badge.badge_name}
                      className="w-8 h-8 object-contain" 
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-base">{badge.badge_name}</h3>
                    <Badge 
                      variant={badge.badge_type === 1 ? "default" : 
                              badge.badge_type === 2 ? "secondary" : "outline"}
                    >
                      {badge.badge_type === 1 ? "Gold" : 
                       badge.badge_type === 2 ? "Silver" : "Bronze"}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      {/* Badge Details Dialog */}
      <Dialog open={badgeDialogOpen} onOpenChange={setBadgeDialogOpen}>
        <DialogContent>
          {selectedBadge && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedBadge.badge_name}</DialogTitle>
                <DialogDescription>
                  Awarded on {new Date(selectedBadge.created_at).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex flex-col items-center my-4">
                <div className="w-20 h-20 mb-4 flex items-center justify-center bg-gray-100 rounded-full overflow-hidden">
                  <img 
                    src={selectedBadge.image_url} 
                    alt={selectedBadge.badge_name}
                    className="w-16 h-16 object-contain" 
                  />
                </div>
                <Badge 
                  variant={selectedBadge.badge_type === 1 ? "default" : 
                          selectedBadge.badge_type === 2 ? "secondary" : "outline"}
                  className="mb-2"
                >
                  {selectedBadge.badge_type === 1 ? "Gold" : 
                   selectedBadge.badge_type === 2 ? "Silver" : "Bronze"}
                </Badge>
              </div>
              
              <Divider />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Description</h3>
                <p className="text-gray-600">{selectedBadge.description}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDetails;
