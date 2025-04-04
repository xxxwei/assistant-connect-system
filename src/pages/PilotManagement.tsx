
import { useState } from 'react';
import { Card } from 'antd';
import { mockPilots } from '../types/pilot';
import PilotListHeader from '../components/pilots/PilotListHeader';
import PilotFilters from '../components/pilots/PilotFilters';
import PilotTable from '../components/pilots/PilotTable';
import UserPagination from '../components/users/UserPagination';
import PilotFormDialog from '../components/pilots/PilotFormDialog';
import { isAdmin, getCurrentUserId } from '../services/userContextService';

const PilotManagement = () => {
  const [searchText, setSearchText] = useState('');
  const [userIdFilter, setUserIdFilter] = useState('all');
  const [emailSearch, setEmailSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPilot, setEditingPilot] = useState<string | null>(null);
  
  const pageSize = 5;
  const admin = isAdmin();
  const currentUserId = getCurrentUserId();

  // Filter pilots based on current user context
  const userPilots = admin 
    ? mockPilots 
    : mockPilots.filter(pilot => pilot.user_id === currentUserId);

  // Further filter pilots based on search
  const filteredPilots = userPilots.filter(pilot => {
    // Filter by user if admin view is enabled
    const matchesUser = !admin || userIdFilter === 'all' || pilot.user_id === userIdFilter;
    
    // Filter by search text
    const matchesSearch = searchText === '' || 
      pilot.firstname.toLowerCase().includes(searchText.toLowerCase()) || 
      pilot.lastname.toLowerCase().includes(searchText.toLowerCase()) ||
      pilot.email.toLowerCase().includes(searchText.toLowerCase()) ||
      pilot.license.toLowerCase().includes(searchText.toLowerCase());
    
    return matchesUser && matchesSearch;
  });

  // Paginate the filtered pilots
  const paginatedPilots = filteredPilots.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredPilots.length / pageSize);

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle reset
  const handleReset = () => {
    setSearchText('');
    if (admin) {
      setUserIdFilter('all');
      setEmailSearch('');
    }
    setCurrentPage(1);
  };

  // Handle edit pilot
  const handleEditPilot = (pilotId: string) => {
    setEditingPilot(pilotId);
    setIsDialogOpen(true);
  };

  // Handle add new pilot
  const handleAddPilot = () => {
    setEditingPilot(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6">
      <PilotListHeader onAddPilot={handleAddPilot} isAdmin={admin} />
      
      {/* Search and Filters */}
      <PilotFilters 
        searchText={searchText}
        setSearchText={setSearchText}
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
          Showing {paginatedPilots.length} of {filteredPilots.length} pilots
        </p>
      </div>
      
      {/* Pilot List */}
      <Card className="shadow-sm overflow-x-auto">
        <PilotTable 
          pilots={paginatedPilots} 
          onEdit={handleEditPilot}
          isAdmin={admin}
        />
      </Card>
      
      {/* Pagination */}
      {filteredPilots.length > 0 && (
        <UserPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* Pilot Form Dialog */}
      <PilotFormDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        pilotId={editingPilot}
      />
    </div>
  );
};

export default PilotManagement;
