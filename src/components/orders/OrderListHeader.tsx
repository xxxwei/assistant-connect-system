
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusIcon, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";

const OrderListHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-light">Order Management</h1>
        <p className="text-muted-foreground">Manage flight review bookings and track payments</p>
      </div>
      <div className="flex gap-2">
        <Link to="/orders/reports">
          <Button variant="outline">
            <BarChart2 className="mr-2 h-4 w-4" />
            View Reports
          </Button>
        </Link>
        <Link to="/orders/create">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderListHeader;
