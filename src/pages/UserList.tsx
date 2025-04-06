
import { useState } from 'react';
import { Card } from 'antd';
import { mockUsers, formatDate } from '../types/user';
import UserListHeader from '../components/users/UserListHeader';
import UserFilters from '../components/users/UserFilters';
import UserTable from '../components/users/UserTable';
import UserPagination from '../components/users/UserPagination';

const UserList = () => {
  const [searchText, setSearchText] = useState('');
  const [userType, setUserType] = useState('all');
  const [status, setStatus] = useState('all');
  const [activated, setActivated] = useState('all');
  const [maacMember, setMaacMember] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filter users based on search and filters
  const filteredUsers = mockUsers.filter(user => {
    const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
    
    const matchesSearch = searchText === '' || 
      fullName.includes(searchText.toLowerCase()) || 
      user.email.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesType = userType === 'all' || user.type === userType;
    const matchesStatus = status === 'all' || user.status === status;
    const matchesActivated = activated === 'all' || user.activated === (activated === 'true');
    const matchesMaac = maacMember === 'all' || user.maac_member === (maacMember === 'true');
    
    return matchesSearch && matchesType && matchesStatus && matchesActivated && matchesMaac;
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
    setActivated('all');
    setMaacMember('all');
    setCurrentPage(1);
  };

  return (
    <div className="p-6">
      <UserListHeader />
      
      {/* Search and Filters */}
      <UserFilters 
        searchText={searchText}
        setSearchText={setSearchText}
        userType={userType}
        setUserType={setUserType}
        status={status}
        setStatus={setStatus}
        activated={activated}
        setActivated={setActivated}
        maacMember={maacMember}
        setMaacMember={setMaacMember}
        handleSearch={handleSearch}
        handleReset={handleReset}
      />
      
      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-500">
          Showing {paginatedUsers.length} of {filteredUsers.length} users
        </p>
      </div>
      
      {/* User List */}
      <Card className="shadow-sm overflow-x-auto">
        <UserTable users={paginatedUsers} />
      </Card>
      
      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <UserPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default UserList;
