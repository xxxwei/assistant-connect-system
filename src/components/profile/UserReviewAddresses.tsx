
import React, { useState } from 'react';
import { Button, Empty } from 'antd';
import { PlusOutlined, EnvironmentOutlined } from '@ant-design/icons';
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
import ReviewAddressFormDialog from '../reviewAddresses/ReviewAddressFormDialog';

interface UserReviewAddressesProps {
  addresses: ReviewAddress[];
}

const UserReviewAddresses: React.FC<UserReviewAddressesProps> = ({ addresses }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);

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

  if (addresses.length === 0) {
    return (
      <div className="py-6">
        <Empty
          description="No review addresses found"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
        <div className="flex justify-center mt-4">
          <Button 
            type="primary" 
            onClick={handleAddAddress} 
            icon={<PlusOutlined />}
          >
            Add Review Address
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Review Addresses</h2>
        <Button 
          type="primary" 
          onClick={handleAddAddress}
          icon={<PlusOutlined />}
        >
          Add Address
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Address</TableHead>
            <TableHead>Province</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Map</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {addresses.map((address) => (
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
                    onCheckedChange={(checked) => handleToggleStatus(address.id, checked)}
                  />
                  <span>{address.enabled ? 'Enabled' : 'Disabled'}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  type="primary" 
                  size="small" 
                  onClick={() => handleEditAddress(address.id)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Address Form Dialog */}
      <ReviewAddressFormDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        addressId={editingAddress}
        reviewerId={addresses.length > 0 ? addresses[0].reviewer_id : ''}
      />
    </div>
  );
};

export default UserReviewAddresses;
