
import React from 'react';
import { Input, Select, Button, Card } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { packageTypes } from '../../types/reviewPackage';
import UserFilter from '../common/UserFilter';

interface ReviewPackageFiltersProps {
  searchText: string;
  setSearchText: (text: string) => void;
  packageTypeFilter: string;
  setPackageTypeFilter: (type: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  userIdFilter?: string;
  setUserIdFilter?: (userId: string) => void;
  emailSearch?: string;
  setEmailSearch?: (email: string) => void;
  isAdmin?: boolean;
  handleSearch: () => void;
  handleReset: () => void;
}

const ReviewPackageFilters: React.FC<ReviewPackageFiltersProps> = ({
  searchText,
  setSearchText,
  packageTypeFilter,
  setPackageTypeFilter,
  statusFilter,
  setStatusFilter,
  userIdFilter = 'all',
  setUserIdFilter = () => {},
  emailSearch = '',
  setEmailSearch = () => {},
  isAdmin = false,
  handleSearch,
  handleReset
}) => {
  // Create type options
  const typeOptions = [
    { value: 'all', label: 'All Types' },
    ...packageTypes.map(type => ({ 
      value: type, 
      label: type.charAt(0).toUpperCase() + type.slice(1) 
    }))
  ];

  // Create status options
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'true', label: 'Enabled' },
    { value: 'false', label: 'Disabled' }
  ];

  return (
    <Card className="mb-6 shadow-sm">
      {isAdmin && (
        <div className="mb-4">
          <UserFilter
            userIdFilter={userIdFilter}
            setUserIdFilter={setUserIdFilter}
            emailSearch={emailSearch}
            setEmailSearch={setEmailSearch}
            onSearch={handleSearch}
            onReset={handleReset}
          />
          <div className="border-t my-4"></div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Input 
            placeholder="Search by title or description" 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            className="w-full"
          />
        </div>
        <div>
          <Select
            placeholder="Package Type"
            className="w-full"
            value={packageTypeFilter}
            onChange={(value) => setPackageTypeFilter(value)}
            options={typeOptions}
          />
        </div>
        <div>
          <Select
            placeholder="Status"
            className="w-full"
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            options={statusOptions}
          />
        </div>
        <div className="flex gap-2 md:col-span-3">
          <Button type="primary" onClick={handleSearch} icon={<SearchOutlined />}>
            Search
          </Button>
          <Button onClick={handleReset} icon={<ReloadOutlined />}>
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ReviewPackageFilters;
