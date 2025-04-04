
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { mockReviewPackages, packageTypes } from '../../types/reviewPackage';
import { toast } from 'sonner';

interface ReviewPackageFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  packageId: string | null;
  reviewerId: string;
}

const ReviewPackageFormDialog: React.FC<ReviewPackageFormDialogProps> = ({ 
  isOpen, 
  onClose, 
  packageId,
  reviewerId
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [packageType, setPackageType] = useState<'standard' | 'premium' | 'custom'>('standard');
  const [enabled, setEnabled] = useState(true);

  // Load package data if editing
  useEffect(() => {
    if (packageId) {
      const pkg = mockReviewPackages.find(p => p.id === packageId);
      if (pkg) {
        setTitle(pkg.title);
        setDescription(pkg.description);
        setPrice(pkg.price.toString());
        setPackageType(pkg.package_type);
        setEnabled(pkg.enabled);
      }
    } else {
      // Reset form for new package
      setTitle('');
      setDescription('');
      setPrice('');
      setPackageType('standard');
      setEnabled(true);
    }
  }, [packageId, isOpen]);

  const handleSubmit = () => {
    // Validate form
    if (!title || !description || !price) {
      toast.error('Please fill out all required fields');
      return;
    }

    // Validate price is a positive number
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    // In a real application, this would save the data to the server
    if (packageId) {
      toast.success('Package updated successfully');
    } else {
      toast.success('New package created successfully');
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{packageId ? 'Edit Review Package' : 'Add New Review Package'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter package title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Enter package description"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($) *</Label>
              <Input 
                id="price" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                placeholder="0.00"
                type="number"
                min="0"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="packageType">Package Type *</Label>
              <Select 
                value={packageType} 
                onValueChange={(value: 'standard' | 'premium' | 'custom') => setPackageType(value)}
              >
                <SelectTrigger id="packageType">
                  <SelectValue placeholder="Select package type" />
                </SelectTrigger>
                <SelectContent>
                  {packageTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-between space-x-2 pt-2">
            <Label htmlFor="enabled">Enable this package</Label>
            <Switch 
              id="enabled" 
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{packageId ? 'Update' : 'Create'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewPackageFormDialog;
