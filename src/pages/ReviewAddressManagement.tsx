
import { useState } from 'react';
import { Card } from 'antd';
import { mockReviewAddresses } from '../types/reviewAddress';
import ReviewAddressListHeader from '../components/reviewAddresses/ReviewAddressListHeader';
import ReviewAddressFilters from '../components/reviewAddresses/ReviewAddressFilters';
import ReviewAddressTable from '../components/reviewAddresses/ReviewAddressTable';
import UserPagination from '../components/users/UserPagination';
import ReviewAddressFormDialog from '../components/reviewAddresses/ReviewAddressFormDialog';
import { isAdmin, getCurrentUserId, isFlightReviewer } from '../services/userContextService';

const ReviewAddressManagement = () => {
  const [searchText, setSearchText] = useState('');
  const [provinceFilter, setProvinceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [userIdFilter, setUserIdFilter] = useState('all');
  const [emailSearch, setEmailSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  
  const pageSize = 5;
  const admin = isAdmin();
  const isReviewer = isFlightReviewer();
  const currentUserId = getCurrentUserId();

  // Only flight reviewers or admins can access this page
  // In a real app, you'd redirect non-reviewers away
  if (!admin && !isReviewer) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-light mb-4">Review Address Management</h1>
        <Card className="shadow-sm">
          <p>You don't have permission to access this page.</p>
        </Card>
      </div>
    );
  }

  // Filter addresses based on current user context
  const userAddresses = admin 
    ? mockReviewAddresses 
    : mockReviewAddresses.filter(address => address.reviewer_id === currentUserId);

  // Further filter addresses based on search and filters
  const filteredAddresses = userAddresses.filter(address => {
    // Filter by user if admin view is enabled
    const matchesUser = !admin || userIdFilter === 'all' || address.reviewer_id === userIdFilter;
    
    // Filter by search text
    const matchesSearch = searchText === '' || 
      address.city.toLowerCase().includes(searchText.toLowerCase()) || 
      address.street.toLowerCase().includes(searchText.toLowerCase()) ||
      address.postal_code.toLowerCase().includes(searchText.toLowerCase()) ||
      (address.address_customized && address.address_customized.toLowerCase().includes(searchText.toLowerCase())) ||
      (address.review_street_desc && address.review_street_desc.toLowerCase().includes(searchText.toLowerCase()));
    
    // Filter by province
    const matchesProvince = provinceFilter === 'all' || address.province === provinceFilter;
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'true' ? address.enabled : !address.enabled);
    
    return matchesUser && matchesSearch && matchesProvince && matchesStatus;
  });

  // Paginate the filtered addresses
  const paginatedAddresses = filteredAddresses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredAddresses.length / pageSize);

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle reset filters
  const handleReset = () => {
    setSearchText('');
    setProvinceFilter('all');
    setStatusFilter('all');
    if (admin) {
      setUserIdFilter('all');
      setEmailSearch('');
    }
    setCurrentPage(1);
  };

  // Handle edit address
  const handleEditAddress = (addressId: string) => {
    setEditingAddress(addressId);
    setIsDialogOpen(true);
  };

  // Handle add new address
  const handleAddAddress = () => {
    setEditingAddress(null);
    setIsDialogOpen(true);
  };

  // Handle toggle address status
  const handleToggleStatus = (addressId: string, enabled: boolean) => {
    // In a real app, this would update the address status in the database
    console.log(`Address ${addressId} status changed to ${enabled ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="p-6">
      <ReviewAddressListHeader onAddAddress={handleAddAddress} isAdmin={admin} />
      
      {/* Search and Filters */}
      <ReviewAddressFilters 
        searchText={searchText}
        setSearchText={setSearchText}
        provinceFilter={provinceFilter}
        setProvinceFilter={setProvinceFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        userIdFilter={userIdFilter}
        setUserIdFilter={setUserIdFilter}
        emailSearch={emailSearch}
        setEmailSearch={setEmailSearch}
        isAdmin={admin}
        handleSearch={handleSearch}
        handleReset={handleReset}
      />
      
      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-500">
          Showing {paginatedAddresses.length} of {filteredAddresses.length} review addresses
        </p>
      </div>
      
      {/* Address List */}
      <Card className="shadow-sm overflow-x-auto mb-4">
        <ReviewAddressTable 
          addresses={paginatedAddresses} 
          onEdit={handleEditAddress}
          onToggleStatus={handleToggleStatus}
          isAdmin={admin}
        />
      </Card>
      
      {/* Pagination */}
      {filteredAddresses.length > 0 && (
        <UserPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* Address Form Dialog */}
      <ReviewAddressFormDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        addressId={editingAddress}
        reviewerId={currentUserId || ''}
      />
    </div>
  );
};

export default ReviewAddressManagement;
