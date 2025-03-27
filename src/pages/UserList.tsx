import { useState } from 'react';
import { Input, Select, Button, Card, Tag, Space } from 'antd';
import { SearchOutlined, ReloadOutlined, EyeIcon } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock data for users
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', type: 'admin', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', type: 'agent', status: 'active' },
  { id: '3', name: 'Robert Johnson', email: 'robert.j@example.com', type: 'agent', status: 'inactive' },
  { id: '4', name: 'Emily Williams', email: 'emily.w@example.com', type: 'agent', status: 'active' },
  { id: '5', name: 'Michael Brown', email: 'michael.b@example.com', type: 'supervisor', status: 'active' },
  { id: '6', name: 'Sarah Davis', email: 'sarah.d@example.com', type: 'agent', status: 'active' },
  { id: '7', name: 'David Miller', email: 'david.m@example.com', type: 'agent', status: 'inactive' },
  { id: '8', name: 'Lisa Wilson', email: 'lisa.w@example.com', type: 'supervisor', status: 'active' },
  { id: '9', name: 'Thomas Moore', email: 'thomas.m@example.com', type: 'agent', status: 'active' },
  { id: '10', name: 'Jennifer Taylor', email: 'jennifer.t@example.com', type: 'agent', status: 'active' },
  { id: '11', name: 'Daniel Anderson', email: 'daniel.a@example.com', type: 'agent', status: 'inactive' },
  { id: '12', name: 'Jessica Thomas', email: 'jessica.t@example.com', type: 'supervisor', status: 'active' },
  { id: '13', name: 'Ryan Jackson', email: 'ryan.j@example.com', type: 'agent', status: 'active' },
  { id: '14', name: 'Olivia White', email: 'olivia.w@example.com', type: 'agent', status: 'active' },
  { id: '15', name: 'Kevin Harris', email: 'kevin.h@example.com', type: 'admin', status: 'inactive' },
  { id: '16', name: 'Amanda Martinez', email: 'amanda.m@example.com', type: 'agent', status: 'active' },
  { id: '17', name: 'Brian Robinson', email: 'brian.r@example.com', type: 'agent', status: 'active' },
  { id: '18', name: 'Stephanie Clark', email: 'stephanie.c@example.com', type: 'supervisor', status: 'inactive' },
  { id: '19', name: 'Matthew Rodriguez', email: 'matthew.r@example.com', type: 'agent', status: 'active' },
  { id: '20', name: 'Laura Lewis', email: 'laura.l@example.com', type: 'agent', status: 'active' },
];

// User type options
const userTypeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'admin', label: 'Admin' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'agent', label: 'Agent' },
];

// Status options
const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

const UserList = () => {
  const [searchText, setSearchText] = useState('');
  const [userType, setUserType] = useState('all');
  const [status, setStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filter users based on search and filters
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = searchText === '' || 
      user.name.toLowerCase().includes(searchText.toLowerCase()) || 
      user.email.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesType = userType === 'all' || user.type === userType;
    const matchesStatus = status === 'all' || user.status === status;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Paginate the filtered users
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle reset filters
  const handleReset = () => {
    setSearchText('');
    setUserType('all');
    setStatus('all');
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-light mb-6">User Management</h1>
      
      {/* Search and Filters */}
      <Card className="mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
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
          <div className="flex gap-2">
            <Button type="primary" onClick={handleSearch} icon={<SearchOutlined />}>
              Search
            </Button>
            <Button onClick={handleReset} icon={<ReloadOutlined />}>
              Reset
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-500">
          Showing {paginatedUsers.length} of {filteredUsers.length} users
        </p>
      </div>
      
      {/* User List */}
      <Card className="shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>User Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No users found matching your search criteria
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Tag 
                      color={
                        user.type === 'admin' ? 'blue' : 
                        user.type === 'supervisor' ? 'purple' : 
                        'green'
                      }
                    >
                      {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                    </Tag>
                  </TableCell>
                  <TableCell>
                    <Tag 
                      color={user.status === 'active' ? 'success' : 'error'}
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Tag>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={`/users/${user.id}`}>
                      <Button type="primary" size="small" icon={<EyeIcon />}>View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
      
      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="mt-4 flex justify-end">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {getPageNumbers().map(page => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default UserList;
