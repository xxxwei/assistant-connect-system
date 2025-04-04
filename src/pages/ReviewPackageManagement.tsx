
import { useState } from 'react';
import { Card } from 'antd';
import { mockReviewPackages } from '../types/reviewPackage';
import ReviewPackageListHeader from '../components/reviewPackages/ReviewPackageListHeader';
import ReviewPackageTable from '../components/reviewPackages/ReviewPackageTable';
import UserPagination from '../components/users/UserPagination';
import ReviewPackageFormDialog from '../components/reviewPackages/ReviewPackageFormDialog';

const ReviewPackageManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<string | null>(null);
  
  const pageSize = 5;

  // In a real app, get the reviewer ID from the current user context
  const currentReviewerId = '5'; // Hardcoded for demo

  // Filter packages for the current reviewer
  const reviewerPackages = mockReviewPackages.filter(
    pkg => pkg.reviewer_id === currentReviewerId
  );

  // Paginate the packages
  const paginatedPackages = reviewerPackages.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(reviewerPackages.length / pageSize);

  // Handle edit package
  const handleEditPackage = (packageId: string) => {
    setEditingPackage(packageId);
    setIsDialogOpen(true);
  };

  // Handle add new package
  const handleAddPackage = () => {
    setEditingPackage(null);
    setIsDialogOpen(true);
  };

  // Handle toggle package status
  const handleToggleStatus = (packageId: string, enabled: boolean) => {
    // In a real app, this would update the package status in the database
    console.log(`Package ${packageId} status changed to ${enabled ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="p-6">
      <ReviewPackageListHeader onAddPackage={handleAddPackage} />
      
      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-500">
          Showing {paginatedPackages.length} of {reviewerPackages.length} review packages
        </p>
      </div>
      
      {/* Package List */}
      <Card className="shadow-sm overflow-x-auto mb-4">
        <ReviewPackageTable 
          packages={paginatedPackages} 
          onEdit={handleEditPackage}
          onToggleStatus={handleToggleStatus}
        />
      </Card>
      
      {/* Pagination */}
      {reviewerPackages.length > 0 && (
        <UserPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* Package Form Dialog */}
      <ReviewPackageFormDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        packageId={editingPackage}
        reviewerId={currentReviewerId}
      />
    </div>
  );
};

export default ReviewPackageManagement;
