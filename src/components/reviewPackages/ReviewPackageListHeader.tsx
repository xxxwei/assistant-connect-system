
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface ReviewPackageListHeaderProps {
  onAddPackage: () => void;
  isAdmin?: boolean;
}

const ReviewPackageListHeader: React.FC<ReviewPackageListHeaderProps> = ({ 
  onAddPackage,
  isAdmin = false 
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-light">Review Package Management</h1>
        <p className="text-muted-foreground">
          {isAdmin 
            ? "Manage review packages across all flight reviewers"
            : "Manage your flight review packages and pricing"}
        </p>
      </div>
      <div>
        <Button onClick={onAddPackage}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Package
        </Button>
      </div>
    </div>
  );
};

export default ReviewPackageListHeader;
