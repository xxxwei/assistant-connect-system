
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface ReviewAddressListHeaderProps {
  onAddAddress: () => void;
  isAdmin?: boolean;
}

const ReviewAddressListHeader: React.FC<ReviewAddressListHeaderProps> = ({ 
  onAddAddress,
  isAdmin = false
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-light">Review Address Management</h1>
        <p className="text-muted-foreground">
          {isAdmin 
            ? "Manage flight review locations across all reviewers"
            : "Manage your flight review locations"}
        </p>
      </div>
      <div>
        <Button onClick={onAddAddress}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Address
        </Button>
      </div>
    </div>
  );
};

export default ReviewAddressListHeader;
