
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const UserListHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-light">User Management</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Configuration</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link to="/config/parameters">Parameters</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/config/business-lines">Business Lines</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserListHeader;
