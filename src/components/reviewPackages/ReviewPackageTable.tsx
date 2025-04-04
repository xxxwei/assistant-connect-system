
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
import { Switch } from "@/components/ui/switch";
import { ReviewPackage } from '../../types/reviewPackage';
import { format } from 'date-fns';

interface ReviewPackageTableProps {
  packages: ReviewPackage[];
  onEdit: (packageId: string) => void;
  onToggleStatus: (packageId: string, enabled: boolean) => void;
}

const ReviewPackageTable: React.FC<ReviewPackageTableProps> = ({ 
  packages, 
  onEdit,
  onToggleStatus
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {packages.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8">
              No review packages found. Create your first package to get started.
            </TableCell>
          </TableRow>
        ) : (
          packages.map((pkg) => (
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
                    onCheckedChange={(checked) => onToggleStatus(pkg.id, checked)}
                  />
                  <span>{pkg.enabled ? 'Enabled' : 'Disabled'}</span>
                </div>
              </TableCell>
              <TableCell>{format(new Date(pkg.create_time), 'PPP')}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    type="primary" 
                    size="small" 
                    icon={<EditOutlined />}
                    onClick={() => onEdit(pkg.id)}
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

export default ReviewPackageTable;
