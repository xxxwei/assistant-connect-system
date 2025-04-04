
import { useState } from 'react';
import { Card } from 'antd';
import { mockReviewPackages } from '../types/reviewPackage';
import ReviewPackageListHeader from '../components/reviewPackages/ReviewPackageListHeader';
import ReviewPackageFilters from '../components/reviewPackages/ReviewPackageFilters';
import ReviewPackageTable from '../components/reviewPackages/ReviewPackageTable';
import UserPagination from '../components/users/UserPagination';
import ReviewPackageFormDialog from '../components/reviewPackages/ReviewPackageFormDialog';
import { isAdmin, getCurrentUserId, isFlightReviewer } from '../services/userContextService';

const ReviewPackageManagement = () => {
  const [searchText, setSearchText] = useState('');
  const [packageTypeFilter, setPackageTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [userIdFilter, setUserIdFilter] = useState('all');
  const [emailSearch, setEmailSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<string | null>(null);
  
  const pageSize = 5;
  const admin = isAdmin();
  const isReviewer = isFlightReviewer();
  const currentUserId = getCurrentUserId();

  // Only flight reviewers or admins can access this page
  // In a real app, you'd redirect non-reviewers away
  if (!admin && !isReviewer) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-light mb-4">Review Package Management</h1>
        <Card className="shadow-sm">
          <p>You don't have permission to access this page.</p>
        </Card>
      </div>
    );
  }

  // Filter packages based on current user context
  const userPackages = admin 
    ? mockReviewPackages 
    : mockReviewPackages.filter(pkg => pkg.reviewer_id === currentUserId);

  // Further filter packages based on search and filters
  const filteredPackages = userPackages.filter(pkg => {
    // Filter by user if admin view is enabled
    const matchesUser = !admin || userIdFilter === 'all' || pkg.reviewer_id === userIdFilter;
    
    // Filter by search text
    const matchesSearch = searchText === '' || 
      pkg.title.toLowerCase().includes(searchText.toLowerCase()) || 
      pkg.description.toLowerCase().includes(searchText.toLowerCase());
    
    // Filter by package type
    const matchesType = packageTypeFilter === 'all' || pkg.package_type === packageTypeFilter;
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'true' ? pkg.enabled : !pkg.enabled);
    
    return matchesUser && matchesSearch && matchesType && matchesStatus;
  });

  // Paginate the filtered packages
  const paginatedPackages = filteredPackages.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredPackages.length / pageSize);

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle reset filters
  const handleReset = () => {
    setSearchText('');
    setPackageTypeFilter('all');
    setStatusFilter('all');
    if (admin) {
      setUserIdFilter('all');
      setEmailSearch('');
    }
    setCurrentPage(1);
  };

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
      <ReviewPackageListHeader onAddPackage={handleAddPackage} isAdmin={admin} />
      
      {/* Search and Filters */}
      <ReviewPackageFilters 
        searchText={searchText}
        setSearchText={setSearchText}
        packageTypeFilter={packageTypeFilter}
        setPackageTypeFilter={setPackageTypeFilter}
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
          Showing {paginatedPackages.length} of {filteredPackages.length} review packages
        </p>
      </div>
      
      {/* Package List */}
      <Card className="shadow-sm overflow-x-auto mb-4">
        <ReviewPackageTable 
          packages={paginatedPackages} 
          onEdit={handleEditPackage}
          onToggleStatus={handleToggleStatus}
          isAdmin={admin}
        />
      </Card>
      
      {/* Pagination */}
      {filteredPackages.length > 0 && (
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
        reviewerId={currentUserId || ''}
      />
    </div>
  );
};

export default ReviewPackageManagement;
