
import React from 'react';
import { Input, Select, Button, Card } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { provinces } from '../../types/reviewAddress';
import UserFilter from '../common/UserFilter';

interface ReviewAddressFiltersProps {
  searchText: string;
  setSearchText: (text: string) => void;
  provinceFilter: string;
  setProvinceFilter: (province: string) => void;
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

const ReviewAddressFilters: React.FC<ReviewAddressFiltersProps> = ({
  searchText,
  setSearchText,
  provinceFilter,
  setProvinceFilter,
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
  // Create province options
  const provinceOptions = [
    { value: 'all', label: 'All Provinces' },
    ...provinces.map(province => ({ value: province, label: province }))
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
            placeholder="Search by city, street, or postal code" 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            className="w-full"
          />
        </div>
        <div>
          <Select
            placeholder="Province"
            className="w-full"
            value={provinceFilter}
            onChange={(value) => setProvinceFilter(value)}
            options={provinceOptions}
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

export default ReviewAddressFilters;
