
import React from 'react';
import { Button, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ReviewAddress } from '../../types/reviewAddress';
import { mockUsers } from '../../types/user';

interface ReviewAddressTableProps {
  addresses: ReviewAddress[];
  onEdit: (addressId: string) => void;
  onToggleStatus: (addressId: string, enabled: boolean) => void;
  isAdmin?: boolean;
}

const ReviewAddressTable: React.FC<ReviewAddressTableProps> = ({ 
  addresses, 
  onEdit,
  onToggleStatus,
  isAdmin = false
}) => {
  // Function to get reviewer name from ID
  const getReviewerName = (reviewerId: string) => {
    const user = mockUsers.find(u => u.id === reviewerId);
    return user ? user.name : 'Unknown Reviewer';
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Address</TableHead>
          <TableHead>Province</TableHead>
          <TableHead>Description</TableHead>
          {isAdmin && <TableHead>Reviewer</TableHead>}
          <TableHead>Coordinates</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {addresses.length === 0 ? (
          <TableRow>
            <TableCell colSpan={isAdmin ? 7 : 6} className="text-center py-8">
              No review addresses found. Create your first address to get started.
            </TableCell>
          </TableRow>
        ) : (
          addresses.map((address) => (
            <TableRow key={address.id}>
              <TableCell>
                <div className="font-medium">{address.street}</div>
                <div className="text-sm text-gray-500">{address.city}, {address.postal_code}</div>
              </TableCell>
              <TableCell>{address.province}</TableCell>
              <TableCell>
                <div className="max-w-md truncate">
                  {address.address_customized || address.review_street_desc || '-'}
                </div>
              </TableCell>
              {isAdmin && (
                <TableCell>{getReviewerName(address.reviewer_id)}</TableCell>
              )}
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button type="default" size="small" icon={<EnvironmentOutlined />}>
                      View Map
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Location Map</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <div className="mb-4">
                        <p><strong>Address:</strong> {address.street}, {address.city}, {address.province}, {address.postal_code}</p>
                        <p><strong>Coordinates:</strong> {address.latitude}, {address.longitude}</p>
                      </div>
                      <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded">
                        <p className="text-gray-500">Map would be displayed here</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={address.enabled} 
                    onCheckedChange={(checked) => onToggleStatus(address.id, checked)}
                  />
                  <span>{address.enabled ? 'Enabled' : 'Disabled'}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    type="primary" 
                    size="small" 
                    icon={<EditOutlined />}
                    onClick={() => onEdit(address.id)}
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

export default ReviewAddressTable;
