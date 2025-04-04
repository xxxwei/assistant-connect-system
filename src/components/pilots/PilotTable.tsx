
import React from 'react';
import { Button, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pilot } from '../../types/pilot';
import { mockUsers } from '../../types/user';
import { format } from 'date-fns';

interface PilotTableProps {
  pilots: Pilot[];
  onEdit: (pilotId: string) => void;
  isAdmin?: boolean;
}

const PilotTable: React.FC<PilotTableProps> = ({ 
  pilots, 
  onEdit,
  isAdmin = false
}) => {
  // Function to get user name from ID
  const getUserName = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>License</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Role</TableHead>
          {isAdmin && <TableHead>Owner</TableHead>}
          <TableHead>License File</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pilots.length === 0 ? (
          <TableRow>
            <TableCell colSpan={isAdmin ? 7 : 6} className="text-center py-8">
              No pilots found matching your search criteria
            </TableCell>
          </TableRow>
        ) : (
          pilots.map((pilot) => (
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
              {isAdmin && (
                <TableCell>{getUserName(pilot.user_id)}</TableCell>
              )}
              <TableCell>
                {pilot.licenseFile ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button type="link" size="small">View</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Pilot License</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <p>Filename: {pilot.licenseFile}</p>
                        <p>Upload Date: {format(new Date(pilot.update_time), 'PPP')}</p>
                        <div className="mt-4 p-4 border rounded bg-gray-50">
                          <p className="text-center text-gray-500">
                            License preview would be displayed here.
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <span className="text-gray-400">None</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    type="primary" 
                    size="small" 
                    icon={<EditOutlined />}
                    onClick={() => onEdit(pilot.id)}
                  >
                    Edit
                  </Button>
                  <Button 
                    type="default" 
                    danger 
                    size="small" 
                    icon={<DeleteOutlined />}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default PilotTable;
