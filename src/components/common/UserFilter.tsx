
import React from 'react';
import { Input, Select, Button } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { mockUsers } from '../../types/user';

interface UserFilterProps {
  userIdFilter: string;
  setUserIdFilter: (userId: string) => void;
  emailSearch: string;
  setEmailSearch: (email: string) => void;
  onSearch: () => void;
  onReset: () => void;
}

const UserFilter: React.FC<UserFilterProps> = ({
  userIdFilter,
  setUserIdFilter,
  emailSearch,
  setEmailSearch,
  onSearch,
  onReset
}) => {
  // Create user options for select dropdown
  const userOptions = [
    { value: 'all', label: 'All Users' },
    ...mockUsers.map(user => ({ 
      value: user.id, 
      label: `${user.name} (${user.email})`
    }))
  ];

  return (
    <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Select
          placeholder="Filter by User"
          className="w-full"
          value={userIdFilter}
          onChange={(value) => setUserIdFilter(value)}
          options={userOptions}
        />
      </div>
      <div>
        <Input 
          placeholder="Search by email" 
          value={emailSearch}
          onChange={(e) => setEmailSearch(e.target.value)}
          prefix={<SearchOutlined />}
          className="w-full"
        />
      </div>
      <div className="flex gap-2">
        <Button type="primary" onClick={onSearch} icon={<SearchOutlined />}>
          Search
        </Button>
        <Button onClick={onReset} icon={<ReloadOutlined />}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default UserFilter;
