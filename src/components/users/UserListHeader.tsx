
import React from 'react';
import { Button } from "@/components/ui/button";

const UserListHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-light">User Management</h1>
    </div>
  );
};

export default UserListHeader;
