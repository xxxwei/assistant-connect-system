
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { mockDrones, droneModels, droneManufacturers, droneColors } from '../../types/drone';
import { toast } from 'sonner';

interface DroneFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  droneId: string | null;
}

const DroneFormDialog: React.FC<DroneFormDialogProps> = ({ isOpen, onClose, droneId }) => {
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [serialno, setSerialno] = useState('');
  const [registrationnumber, setRegistrationnumber] = useState('');
  const [nickname, setNickname] = useState('');
  const [color, setColor] = useState('');
  const [threshold, setThreshold] = useState('100');
  const [availability, setAvailability] = useState(true);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [existingCertificate, setExistingCertificate] = useState('');

  // Load drone data if editing
  useEffect(() => {
    if (droneId) {
      const drone = mockDrones.find(d => d.id === droneId);
      if (drone) {
        setManufacturer(drone.manufacturer);
        setModel(drone.model);
        setSerialno(drone.serialno);
        setRegistrationnumber(drone.registrationnumber);
        setNickname(drone.nickname);
        setColor(drone.color);
        setThreshold(drone.threshold.toString());
        setAvailability(drone.availability);
        setExistingCertificate(drone.certificateFile || '');
      }
    } else {
      // Reset form for new drone
      setManufacturer('');
      setModel('');
      setSerialno('');
      setRegistrationnumber('');
      setNickname('');
      setColor('');
      setThreshold('100');
      setAvailability(true);
      setCertificateFile(null);
      setExistingCertificate('');
    }
  }, [droneId, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCertificateFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Validate form
    if (!manufacturer || !model || !serialno || !registrationnumber) {
      toast.error('Please fill out all required fields');
      return;
    }

    // In a real application, this would save the data to the server
    if (droneId) {
      toast.success('Drone updated successfully');
    } else {
      toast.success('New drone created successfully');
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{droneId ? 'Edit Drone' : 'Add New Drone'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="manufacturer">Manufacturer *</Label>
              <Select 
                value={manufacturer} 
                onValueChange={setManufacturer}
              >
                <SelectTrigger id="manufacturer">
                  <SelectValue placeholder="Select manufacturer" />
                </SelectTrigger>
                <SelectContent>
                  {droneManufacturers.map(m => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model *</Label>
              <Select 
                value={model} 
                onValueChange={setModel}
              >
                <SelectTrigger id="model">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {droneModels.map(m => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serialno">Serial Number *</Label>
              <Input 
                id="serialno" 
                value={serialno} 
                onChange={(e) => setSerialno(e.target.value)} 
                placeholder="Enter serial number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationnumber">Registration Number *</Label>
              <Input 
                id="registrationnumber" 
                value={registrationnumber} 
                onChange={(e) => setRegistrationnumber(e.target.value)} 
                placeholder="Enter registration number"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nickname">Nickname</Label>
              <Input 
                id="nickname" 
                value={nickname} 
                onChange={(e) => setNickname(e.target.value)} 
                placeholder="Enter nickname"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Select 
                value={color} 
                onValueChange={setColor}
              >
                <SelectTrigger id="color">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {droneColors.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="threshold">Threshold</Label>
              <Input 
                id="threshold" 
                value={threshold} 
                onChange={(e) => setThreshold(e.target.value)} 
                type="number"
                min="0"
              />
            </div>
            <div className="space-y-2 flex flex-col justify-end">
              <div className="flex items-center justify-between">
                <Label htmlFor="availability">Available</Label>
                <Switch 
                  id="availability" 
                  checked={availability}
                  onCheckedChange={setAvailability}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="certificateFile">Certificate File</Label>
            {existingCertificate && (
              <div className="text-sm text-gray-500 mb-2">
                Current file: {existingCertificate}
              </div>
            )}
            <Input 
              id="certificateFile" 
              type="file" 
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload drone certification document (PDF, JPG, PNG)
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{droneId ? 'Update' : 'Create'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DroneFormDialog;
