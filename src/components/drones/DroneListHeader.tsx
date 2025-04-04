
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface DroneListHeaderProps {
  onAddDrone: () => void;
  isAdmin?: boolean;
}

const DroneListHeader: React.FC<DroneListHeaderProps> = ({ onAddDrone, isAdmin = false }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-light">Drone Management</h1>
        <p className="text-muted-foreground">
          {isAdmin 
            ? "Manage all drones across users"
            : "Manage your drone information and certifications"}
        </p>
      </div>
      <div>
        <Button onClick={onAddDrone}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Drone
        </Button>
      </div>
    </div>
  );
};

export default DroneListHeader;
