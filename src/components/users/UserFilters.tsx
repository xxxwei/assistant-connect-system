
import React from 'react';
import { Input, Select, Button, Card } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { userTypeOptions, statusOptions, activationOptions, maacOptions } from '../../types/user';

interface UserFiltersProps {
  searchText: string;
  setSearchText: (text: string) => void;
  userType: string;
  setUserType: (type: string) => void;
  status: string;
  setStatus: (status: string) => void;
  activated: string;
  setActivated: (activated: string) => void;
  maacMember: string;
  setMaacMember: (maac: string) => void;
  handleSearch: () => void;
  handleReset: () => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  searchText,
  setSearchText,
  userType,
  setUserType,
  status,
  setStatus,
  activated,
  setActivated,
  maacMember,
  setMaacMember,
  handleSearch,
  handleReset
}) => {
  return (
    <Card className="mb-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="lg:col-span-2">
          <Input 
            placeholder="Search by name or email" 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            className="w-full"
          />
        </div>
        <div>
          <Select
            placeholder="User Type"
            className="w-full"
            value={userType}
            onChange={(value) => setUserType(value)}
            options={userTypeOptions}
          />
        </div>
        <div>
          <Select
            placeholder="Status"
            className="w-full"
            value={status}
            onChange={(value) => setStatus(value)}
            options={statusOptions}
          />
        </div>
        <div>
          <Select
            placeholder="Activated"
            className="w-full"
            value={activated}
            onChange={(value) => setActivated(value)}
            options={activationOptions}
          />
        </div>
        <div>
          <Select
            placeholder="MAAC Member"
            className="w-full"
            value={maacMember}
            onChange={(value) => setMaacMember(value)}
            options={maacOptions}
          />
        </div>
      </div>
      <div className="mt-4 flex gap-2 justify-end">
        <Button type="primary" onClick={handleSearch} icon={<SearchOutlined />}>
          Search
        </Button>
        <Button onClick={handleReset} icon={<ReloadOutlined />}>
          Reset
        </Button>
      </div>
    </Card>
  );
};

export default UserFilters;
