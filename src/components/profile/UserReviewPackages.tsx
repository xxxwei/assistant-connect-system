
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
import { Switch } from "@/components/ui/switch";
import { ReviewPackage } from '../../types/reviewPackage';
import ReviewPackageFormDialog from '../reviewPackages/ReviewPackageFormDialog';

interface UserReviewPackagesProps {
  packages: ReviewPackage[];
}

const UserReviewPackages: React.FC<UserReviewPackagesProps> = ({ packages }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<string | null>(null);

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

  if (packages.length === 0) {
    return (
      <div className="py-6">
        <Empty
          description="No review packages found"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
        <div className="flex justify-center mt-4">
          <Button 
            type="primary" 
            onClick={handleAddPackage} 
            icon={<PlusOutlined />}
          >
            Add Review Package
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Review Packages</h2>
        <Button 
          type="primary" 
          onClick={handleAddPackage}
          icon={<PlusOutlined />}
        >
          Add Package
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packages.map((pkg) => (
            <TableRow key={pkg.id}>
              <TableCell className="font-medium">{pkg.title}</TableCell>
              <TableCell>
                <div className="max-w-md truncate">{pkg.description}</div>
              </TableCell>
              <TableCell>${pkg.price.toFixed(2)}</TableCell>
              <TableCell>
                <Tag 
                  color={
                    pkg.package_type === 'premium' ? 'gold' : 
                    pkg.package_type === 'standard' ? 'blue' : 
                    'purple'
                  }
                >
                  {pkg.package_type.charAt(0).toUpperCase() + pkg.package_type.slice(1)}
                </Tag>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={pkg.enabled} 
                    onCheckedChange={(checked) => handleToggleStatus(pkg.id, checked)}
                  />
                  <span>{pkg.enabled ? 'Enabled' : 'Disabled'}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  type="primary" 
                  size="small" 
                  onClick={() => handleEditPackage(pkg.id)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Package Form Dialog */}
      <ReviewPackageFormDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        packageId={editingPackage}
        reviewerId={packages.length > 0 ? packages[0].reviewer_id : ''}
      />
    </div>
  );
};

export default UserReviewPackages;
