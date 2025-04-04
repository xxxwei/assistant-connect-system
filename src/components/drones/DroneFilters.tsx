
import React from 'react';
import { Input, Select, Button, Card } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { droneModels, droneColors } from '../../types/drone';
import UserFilter from '../common/UserFilter';

interface DroneFiltersProps {
  searchText: string;
  setSearchText: (text: string) => void;
  modelFilter: string;
  setModelFilter: (model: string) => void;
  colorFilter: string;
  setColorFilter: (color: string) => void;
  availabilityFilter: string;
  setAvailabilityFilter: (availability: string) => void;
  userIdFilter?: string;
  setUserIdFilter?: (userId: string) => void;
  emailSearch?: string;
  setEmailSearch?: (email: string) => void;
  isAdmin?: boolean;
  handleSearch: () => void;
  handleReset: () => void;
}

const DroneFilters: React.FC<DroneFiltersProps> = ({
  searchText,
  setSearchText,
  modelFilter,
  setModelFilter,
  colorFilter,
  setColorFilter,
  availabilityFilter,
  setAvailabilityFilter,
  userIdFilter = 'all',
  setUserIdFilter = () => {},
  emailSearch = '',
  setEmailSearch = () => {},
  isAdmin = false,
  handleSearch,
  handleReset
}) => {
  // Create model options
  const modelOptions = [
    { value: 'all', label: 'All Models' },
    ...droneModels.map(model => ({ value: model, label: model }))
  ];

  // Create color options
  const colorOptions = [
    { value: 'all', label: 'All Colors' },
    ...droneColors.map(color => ({ value: color, label: color }))
  ];

  // Create availability options
  const availabilityOptions = [
    { value: 'all', label: 'All Availability' },
    { value: 'true', label: 'Available' },
    { value: 'false', label: 'Unavailable' }
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
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Input 
            placeholder="Search by manufacturer, model, serial number or nickname" 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            className="w-full"
          />
        </div>
        <div>
          <Select
            placeholder="Model"
            className="w-full"
            value={modelFilter}
            onChange={(value) => setModelFilter(value)}
            options={modelOptions}
          />
        </div>
        <div>
          <Select
            placeholder="Color"
            className="w-full"
            value={colorFilter}
            onChange={(value) => setColorFilter(value)}
            options={colorOptions}
          />
        </div>
        <div>
          <Select
            placeholder="Availability"
            className="w-full"
            value={availabilityFilter}
            onChange={(value) => setAvailabilityFilter(value)}
            options={availabilityOptions}
          />
        </div>
        <div className="flex gap-2 md:col-span-4">
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

export default DroneFilters;
