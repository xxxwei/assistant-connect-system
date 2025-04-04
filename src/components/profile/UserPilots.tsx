
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
import { Pilot } from '../../types/pilot';
import PilotFormDialog from '../pilots/PilotFormDialog';

interface UserPilotsProps {
  pilots: Pilot[];
}

const UserPilots: React.FC<UserPilotsProps> = ({ pilots }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPilot, setEditingPilot] = useState<string | null>(null);

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

  if (pilots.length === 0) {
    return (
      <div className="py-6">
        <Empty
          description="No pilots found"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
        <div className="flex justify-center mt-4">
          <Button 
            type="primary" 
            onClick={handleAddPilot} 
            icon={<PlusOutlined />}
          >
            Add Pilot
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Registered Pilots</h2>
        <Button 
          type="primary" 
          onClick={handleAddPilot}
          icon={<PlusOutlined />}
        >
          Add Pilot
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>License</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pilots.map((pilot) => (
            <TableRow key={pilot.id}>
              <TableCell>
                <div className="font-medium">{pilot.firstname} {pilot.lastname}</div>
              </TableCell>
              <TableCell>{pilot.license}</TableCell>
              <TableCell>
                <div>{pilot.email}</div>
                <div className="text-sm text-gray-500">{pilot.phone}</div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {pilot.pilot && <Tag color="blue">Pilot</Tag>}
                  {pilot.observer && <Tag color="green">Observer</Tag>}
                  {pilot.payloadOperator && <Tag color="purple">Payload Op</Tag>}
                  {pilot.superuser && <Tag color="gold">Superuser</Tag>}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  type="primary" 
                  size="small" 
                  onClick={() => handleEditPilot(pilot.id)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pilot Form Dialog */}
      <PilotFormDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        pilotId={editingPilot}
      />
    </div>
  );
};

export default UserPilots;
