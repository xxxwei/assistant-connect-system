
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { mockPilots } from '../../types/pilot';
import { toast } from 'sonner';

interface PilotFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  pilotId: string | null;
}

const PilotFormDialog: React.FC<PilotFormDialogProps> = ({ isOpen, onClose, pilotId }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [license, setLicense] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isPilot, setIsPilot] = useState(true);
  const [isObserver, setIsObserver] = useState(false);
  const [isPayloadOperator, setIsPayloadOperator] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [existingLicenseFile, setExistingLicenseFile] = useState('');

  // Load pilot data if editing
  useEffect(() => {
    if (pilotId) {
      const pilot = mockPilots.find(p => p.id === pilotId);
      if (pilot) {
        setFirstname(pilot.firstname);
        setLastname(pilot.lastname);
        setLicense(pilot.license);
        setPhone(pilot.phone);
        setEmail(pilot.email);
        setIsPilot(pilot.pilot);
        setIsObserver(pilot.observer);
        setIsPayloadOperator(pilot.payloadOperator);
        setIsSuperuser(pilot.superuser);
        setExistingLicenseFile(pilot.licenseFile || '');
      }
    } else {
      // Reset form for new pilot
      setFirstname('');
      setLastname('');
      setLicense('');
      setPhone('');
      setEmail('');
      setIsPilot(true);
      setIsObserver(false);
      setIsPayloadOperator(false);
      setIsSuperuser(false);
      setLicenseFile(null);
      setExistingLicenseFile('');
    }
  }, [pilotId, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLicenseFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Validate form
    if (!firstname || !lastname || !license || !email) {
      toast.error('Please fill out all required fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // In a real application, this would save the data to the server
    if (pilotId) {
      toast.success('Pilot updated successfully');
    } else {
      toast.success('New pilot created successfully');
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{pilotId ? 'Edit Pilot' : 'Add New Pilot'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstname">First Name *</Label>
              <Input 
                id="firstname" 
                value={firstname} 
                onChange={(e) => setFirstname(e.target.value)} 
                placeholder="Enter first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Last Name *</Label>
              <Input 
                id="lastname" 
                value={lastname} 
                onChange={(e) => setLastname(e.target.value)} 
                placeholder="Enter last name"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="license">License Number *</Label>
            <Input 
              id="license" 
              value={license} 
              onChange={(e) => setLicense(e.target.value)} 
              placeholder="Enter license number"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input 
                id="email" 
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="Enter phone number"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <Label>Roles</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="isPilot">Pilot</Label>
                <Switch 
                  id="isPilot" 
                  checked={isPilot}
                  onCheckedChange={setIsPilot}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="isObserver">Observer</Label>
                <Switch 
                  id="isObserver" 
                  checked={isObserver}
                  onCheckedChange={setIsObserver}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="isPayloadOperator">Payload Operator</Label>
                <Switch 
                  id="isPayloadOperator" 
                  checked={isPayloadOperator}
                  onCheckedChange={setIsPayloadOperator}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="isSuperuser">Superuser</Label>
                <Switch 
                  id="isSuperuser" 
                  checked={isSuperuser}
                  onCheckedChange={setIsSuperuser}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="licenseFile">License File</Label>
            {existingLicenseFile && (
              <div className="text-sm text-gray-500 mb-2">
                Current file: {existingLicenseFile}
              </div>
            )}
            <Input 
              id="licenseFile" 
              type="file" 
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload pilot license document (PDF, JPG, PNG)
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{pilotId ? 'Update' : 'Create'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PilotFormDialog;
