
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { mockReviewAddresses, provinces } from '../../types/reviewAddress';
import { toast } from 'sonner';

interface ReviewAddressFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  addressId: string | null;
  reviewerId: string;
}

const ReviewAddressFormDialog: React.FC<ReviewAddressFormDialogProps> = ({ 
  isOpen, 
  onClose, 
  addressId,
  reviewerId
}) => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [description, setDescription] = useState('');
  const [customAddress, setCustomAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [enabled, setEnabled] = useState(true);

  // Load address data if editing
  useEffect(() => {
    if (addressId) {
      const address = mockReviewAddresses.find(a => a.id === addressId);
      if (address) {
        setStreet(address.street);
        setCity(address.city);
        setProvince(address.province);
        setPostalCode(address.postal_code);
        setDescription(address.review_street_desc || '');
        setCustomAddress(address.address_customized || '');
        setLatitude(address.latitude.toString());
        setLongitude(address.longitude.toString());
        setEnabled(address.enabled);
      }
    } else {
      // Reset form for new address
      setStreet('');
      setCity('');
      setProvince('');
      setPostalCode('');
      setDescription('');
      setCustomAddress('');
      setLatitude('');
      setLongitude('');
      setEnabled(true);
    }
  }, [addressId, isOpen]);

  const handleSubmit = () => {
    // Validate form
    if (!street || !city || !province || !postalCode) {
      toast.error('Please fill out all required address fields');
      return;
    }

    // Validate coordinates
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      toast.error('Please enter valid latitude and longitude coordinates');
      return;
    }

    // In a real application, this would save the data to the server
    if (addressId) {
      toast.success('Address updated successfully');
    } else {
      toast.success('New address created successfully');
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{addressId ? 'Edit Review Address' : 'Add New Review Address'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="street">Street Address *</Label>
              <Input 
                id="street" 
                value={street} 
                onChange={(e) => setStreet(e.target.value)} 
                placeholder="Enter street address"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input 
                id="city" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                placeholder="Enter city"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="province">Province *</Label>
              <Select 
                value={province} 
                onValueChange={setProvince}
              >
                <SelectTrigger id="province">
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code *</Label>
              <Input 
                id="postalCode" 
                value={postalCode} 
                onChange={(e) => setPostalCode(e.target.value)} 
                placeholder="Enter postal code"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Enter location description"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customAddress">Custom Address (Optional)</Label>
              <Textarea 
                id="customAddress" 
                value={customAddress} 
                onChange={(e) => setCustomAddress(e.target.value)} 
                placeholder="Enter custom address instructions"
                rows={3}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude *</Label>
              <Input 
                id="latitude" 
                value={latitude} 
                onChange={(e) => setLatitude(e.target.value)} 
                placeholder="Enter latitude (e.g. 43.6532)"
                type="number"
                step="0.0001"
                min="-90"
                max="90"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude *</Label>
              <Input 
                id="longitude" 
                value={longitude} 
                onChange={(e) => setLongitude(e.target.value)} 
                placeholder="Enter longitude (e.g. -79.3832)"
                type="number"
                step="0.0001"
                min="-180"
                max="180"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="h-40 w-full bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Map preview would be shown here</p>
            </div>
            <p className="text-xs text-gray-500">
              Enter coordinates above or click on the map to set location
            </p>
          </div>
          
          <div className="flex items-center justify-between space-x-2 pt-2">
            <Label htmlFor="enabled">Enable this location</Label>
            <Switch 
              id="enabled" 
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{addressId ? 'Update' : 'Create'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewAddressFormDialog;
