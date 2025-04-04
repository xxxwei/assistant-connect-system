
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from 'antd';
import { mockDrones } from '../types/drone';
import DroneListHeader from '../components/drones/DroneListHeader';
import DroneFilters from '../components/drones/DroneFilters';
import DroneTable from '../components/drones/DroneTable';
import UserPagination from '../components/users/UserPagination';
import DroneFormDialog from '../components/drones/DroneFormDialog';

const DroneManagement = () => {
  const [searchText, setSearchText] = useState('');
  const [modelFilter, setModelFilter] = useState('all');
  const [colorFilter, setColorFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDrone, setEditingDrone] = useState<string | null>(null);
  
  const pageSize = 5;

  // Filter drones based on search and filters
  const filteredDrones = mockDrones.filter(drone => {
    const matchesSearch = searchText === '' || 
      drone.manufacturer.toLowerCase().includes(searchText.toLowerCase()) || 
      drone.model.toLowerCase().includes(searchText.toLowerCase()) ||
      drone.serialno.toLowerCase().includes(searchText.toLowerCase()) ||
      drone.nickname.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesModel = modelFilter === 'all' || drone.model === modelFilter;
    const matchesColor = colorFilter === 'all' || drone.color === colorFilter;
    const matchesAvailability = availabilityFilter === 'all' || 
      (availabilityFilter === 'true' ? drone.availability : !drone.availability);
    
    return matchesSearch && matchesModel && matchesColor && matchesAvailability;
  });

  // Paginate the filtered drones
  const paginatedDrones = filteredDrones.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredDrones.length / pageSize);

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle reset filters
  const handleReset = () => {
    setSearchText('');
    setModelFilter('all');
    setColorFilter('all');
    setAvailabilityFilter('all');
    setCurrentPage(1);
  };

  // Handle edit drone
  const handleEditDrone = (droneId: string) => {
    setEditingDrone(droneId);
    setIsDialogOpen(true);
  };

  // Handle add new drone
  const handleAddDrone = () => {
    setEditingDrone(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6">
      <DroneListHeader onAddDrone={handleAddDrone} />
      
      {/* Search and Filters */}
      <DroneFilters 
        searchText={searchText}
        setSearchText={setSearchText}
        modelFilter={modelFilter}
        setModelFilter={setModelFilter}
        colorFilter={colorFilter}
        setColorFilter={setColorFilter}
        availabilityFilter={availabilityFilter}
        setAvailabilityFilter={setAvailabilityFilter}
        handleSearch={handleSearch}
        handleReset={handleReset}
      />
      
      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-500">
          Showing {paginatedDrones.length} of {filteredDrones.length} drones
        </p>
      </div>
      
      {/* Drone List */}
      <Card className="shadow-sm overflow-x-auto">
        <DroneTable 
          drones={paginatedDrones} 
          onEdit={handleEditDrone}
        />
      </Card>
      
      {/* Pagination */}
      {filteredDrones.length > 0 && (
        <UserPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* Drone Form Dialog */}
      <DroneFormDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        droneId={editingDrone}
      />
    </div>
  );
};

export default DroneManagement;
