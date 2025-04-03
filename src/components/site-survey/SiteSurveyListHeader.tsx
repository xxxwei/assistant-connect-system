
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusIcon, MapIcon } from "lucide-react";
import { Link } from "react-router-dom";

const SiteSurveyListHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-light">Site Survey Management</h1>
        <p className="text-muted-foreground">Manage drone flight site surveys and generate reports</p>
      </div>
      <div className="flex gap-2">
        <Link to="/site-surveys/create">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            New Survey
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SiteSurveyListHeader;
