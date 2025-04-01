
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PencilIcon, TrashIcon, PlusIcon } from "lucide-react";
import { mockBusinessLines, BusinessLine } from '../types/configParam';
import { useToast } from "@/components/ui/use-toast";

const BusinessLineManagement = () => {
  const [businessLines, setBusinessLines] = useState<BusinessLine[]>(mockBusinessLines);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentBusinessLine, setCurrentBusinessLine] = useState<BusinessLine | null>(null);
  const [newBusinessLine, setNewBusinessLine] = useState<Partial<BusinessLine>>({
    name: '',
    description: '',
  });
  const { toast } = useToast();

  const handleAddBusinessLine = () => {
    if (!newBusinessLine.name) {
      toast({
        title: "Validation Error",
        description: "Business line name is required",
        variant: "destructive",
      });
      return;
    }

    const businessLine: BusinessLine = {
      id: String(Date.now()),
      name: newBusinessLine.name,
      description: newBusinessLine.description || '',
    };

    setBusinessLines([...businessLines, businessLine]);
    setNewBusinessLine({ name: '', description: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Business Line Added",
      description: `Business line "${businessLine.name}" has been created successfully.`,
    });
  };

  const handleEditBusinessLine = () => {
    if (!currentBusinessLine || !currentBusinessLine.name) {
      toast({
        title: "Validation Error",
        description: "Business line name is required",
        variant: "destructive",
      });
      return;
    }

    setBusinessLines(
      businessLines.map((bl) =>
        bl.id === currentBusinessLine.id ? currentBusinessLine : bl
      )
    );
    setIsEditDialogOpen(false);
    
    toast({
      title: "Business Line Updated",
      description: `Business line "${currentBusinessLine.name}" has been updated successfully.`,
    });
  };

  const handleDeleteBusinessLine = () => {
    if (!currentBusinessLine) return;
    
    setBusinessLines(businessLines.filter((bl) => bl.id !== currentBusinessLine.id));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Business Line Deleted",
      description: `Business line "${currentBusinessLine.name}" has been deleted successfully.`,
    });
  };

  return (
    <div className="p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-light">Business Line Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Business Line
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {businessLines.map((businessLine) => (
            <TableRow key={businessLine.id}>
              <TableCell className="font-medium">{businessLine.name}</TableCell>
              <TableCell>{businessLine.description}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setCurrentBusinessLine(businessLine);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setCurrentBusinessLine(businessLine);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Business Line Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Business Line</DialogTitle>
            <DialogDescription>
              Create a new business line for parameter configuration.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newBusinessLine.name}
                onChange={(e) =>
                  setNewBusinessLine({ ...newBusinessLine, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={newBusinessLine.description}
                onChange={(e) =>
                  setNewBusinessLine({ ...newBusinessLine, description: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddBusinessLine}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Business Line Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Business Line</DialogTitle>
            <DialogDescription>
              Update business line details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                value={currentBusinessLine?.name || ''}
                onChange={(e) =>
                  setCurrentBusinessLine(
                    currentBusinessLine
                      ? { ...currentBusinessLine, name: e.target.value }
                      : null
                  )
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">
                Description
              </Label>
              <Input
                id="edit-description"
                value={currentBusinessLine?.description || ''}
                onChange={(e) =>
                  setCurrentBusinessLine(
                    currentBusinessLine
                      ? { ...currentBusinessLine, description: e.target.value }
                      : null
                  )
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditBusinessLine}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Business Line Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Business Line</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this business line?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteBusinessLine}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessLineManagement;
