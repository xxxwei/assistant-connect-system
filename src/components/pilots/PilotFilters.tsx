
import React from 'react';
import { Input, Button, Card } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';

interface PilotFiltersProps {
  searchText: string;
  setSearchText: (text: string) => void;
  handleSearch: () => void;
  handleReset: () => void;
}

const PilotFilters: React.FC<PilotFiltersProps> = ({
  searchText,
  setSearchText,
  handleSearch,
  handleReset
}) => {
  return (
    <Card className="mb-6 shadow-sm">
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
