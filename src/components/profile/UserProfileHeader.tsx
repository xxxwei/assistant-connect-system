
import React from 'react';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { User } from '../../types/user';

interface UserProfileHeaderProps {
  user: User;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ user }) => {
  return (
    <Card className="shadow-sm">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <Avatar size={100} icon={<UserOutlined />} className="bg-blue-500" />
        <div>
          <h1 className="text-2xl font-light">{user.name}</h1>
          <p className="text-gray-500 mb-3">{user.email}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">User Type</p>
              <p>{user.type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <p className={user.status === 'active' ? 'text-green-600' : 'text-red-600'}>
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserProfileHeader;
