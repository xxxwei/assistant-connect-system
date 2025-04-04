
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface PilotListHeaderProps {
  onAddPilot: () => void;
  isAdmin?: boolean;
}

const PilotListHeader: React.FC<PilotListHeaderProps> = ({ onAddPilot, isAdmin = false }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-light">Pilot Management</h1>
        <p className="text-muted-foreground">
          {isAdmin 
            ? "Manage all pilots across users"
            : "Manage your pilot information and certifications"}
        </p>
      </div>
      <div>
        <Button onClick={onAddPilot}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Pilot
        </Button>
      </div>
    </div>
  );
};

export default PilotListHeader;
