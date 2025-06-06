
import React from 'react';
import { Input, Button, Card } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import UserFilter from '../common/UserFilter';

interface PilotFiltersProps {
  searchText: string;
  setSearchText: (text: string) => void;
  userIdFilter?: string;
  setUserIdFilter?: (userId: string) => void;
  emailSearch?: string;
  setEmailSearch?: (email: string) => void;
  isAdmin?: boolean;
  handleSearch: () => void;
  handleReset: () => void;
}

const PilotFilters: React.FC<PilotFiltersProps> = ({
  searchText,
  setSearchText,
  userIdFilter = 'all',
  setUserIdFilter = () => {},
  emailSearch = '',
  setEmailSearch = () => {},
  isAdmin = false,
  handleSearch,
  handleReset
}) => {
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input 
            placeholder="Search by name, email, or license number" 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            className="w-full"
          />
        </div>
        <div className="flex gap-2 justify-end">
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

export default PilotFilters;
