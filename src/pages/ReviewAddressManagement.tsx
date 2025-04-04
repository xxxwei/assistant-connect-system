
import { useState } from 'react';
import { Card } from 'antd';
import { mockReviewAddresses } from '../types/reviewAddress';
import ReviewAddressListHeader from '../components/reviewAddresses/ReviewAddressListHeader';
import ReviewAddressTable from '../components/reviewAddresses/ReviewAddressTable';
import UserPagination from '../components/users/UserPagination';
import ReviewAddressFormDialog from '../components/reviewAddresses/ReviewAddressFormDialog';

const ReviewAddressManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  
  const pageSize = 5;

  // In a real app, get the reviewer ID from the current user context
  const currentReviewerId = '5'; // Hardcoded for demo

  // Filter addresses for the current reviewer
  const reviewerAddresses = mockReviewAddresses.filter(
    address => address.reviewer_id === currentReviewerId
  );

  // Paginate the addresses
  const paginatedAddresses = reviewerAddresses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(reviewerAddresses.length / pageSize);

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
      <ReviewAddressListHeader onAddAddress={handleAddAddress} />
      
      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-500">
          Showing {paginatedAddresses.length} of {reviewerAddresses.length} review addresses
        </p>
      </div>
      
      {/* Address List */}
      <Card className="shadow-sm overflow-x-auto mb-4">
        <ReviewAddressTable 
          addresses={paginatedAddresses} 
          onEdit={handleEditAddress}
          onToggleStatus={handleToggleStatus}
        />
      </Card>
      
      {/* Pagination */}
      {reviewerAddresses.length > 0 && (
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
        reviewerId={currentReviewerId}
      />
    </div>
  );
};

export default ReviewAddressManagement;
