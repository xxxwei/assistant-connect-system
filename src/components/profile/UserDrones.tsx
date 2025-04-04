
import React, { useState } from 'react';
import { Button, Tag, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { Drone } from '../../types/drone';
import DroneFormDialog from '../drones/DroneFormDialog';

interface UserDronesProps {
  drones: Drone[];
}

const UserDrones: React.FC<UserDronesProps> = ({ drones }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDrone, setEditingDrone] = useState<string | null>(null);

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

  if (drones.length === 0) {
    return (
      <div className="py-6">
        <Empty
          description="No drones found"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
        <div className="flex justify-center mt-4">
          <Button 
            type="primary" 
            onClick={handleAddDrone} 
            icon={<PlusOutlined />}
          >
            Add Drone
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Registered Drones</h2>
        <Button 
          type="primary" 
          onClick={handleAddDrone}
          icon={<PlusOutlined />}
        >
          Add Drone
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Manufacturer</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Serial No.</TableHead>
            <TableHead>Registration</TableHead>
            <TableHead>Nickname</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drones.map((drone) => (
            <TableRow key={drone.id}>
              <TableCell>{drone.manufacturer}</TableCell>
              <TableCell>{drone.model}</TableCell>
              <TableCell>{drone.serialno}</TableCell>
              <TableCell>{drone.registrationnumber}</TableCell>
              <TableCell>{drone.nickname}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: drone.color.toLowerCase() }}
                  ></div>
                  {drone.color}
                </div>
              </TableCell>
              <TableCell>
                <Tag 
                  color={drone.availability ? 'success' : 'error'}
                >
                  {drone.availability ? 'Available' : 'Unavailable'}
                </Tag>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  type="primary" 
                  size="small" 
                  onClick={() => handleEditDrone(drone.id)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Drone Form Dialog */}
      <DroneFormDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        droneId={editingDrone}
      />
    </div>
  );
};

export default UserDrones;
