
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

const UserListHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-light">User Management</h1>
      <div>
        <Link to="/users/create">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UserListHeader;
