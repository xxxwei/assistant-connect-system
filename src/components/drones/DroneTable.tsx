
import React from 'react';
import { Button, Tag } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { Drone } from '../../types/drone';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';

interface DroneTableProps {
  drones: Drone[];
  onEdit: (droneId: string) => void;
}

const DroneTable: React.FC<DroneTableProps> = ({ drones, onEdit }) => {
  return (
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
          <TableHead>Certificate</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {drones.length === 0 ? (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-8">
              No drones found matching your search criteria
            </TableCell>
          </TableRow>
        ) : (
          drones.map((drone) => (
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
              <TableCell>
                {drone.certificateFile ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button type="link" size="small">View</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Drone Certificate</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <p>Filename: {drone.certificateFile}</p>
                        <p>Upload Date: {format(new Date(drone.update_time), 'PPP')}</p>
                        <div className="mt-4 p-4 border rounded bg-gray-50">
                          <p className="text-center text-gray-500">
                            Certificate preview would be displayed here.
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
                    onClick={() => onEdit(drone.id)}
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

export default DroneTable;
