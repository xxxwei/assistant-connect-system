
import React, { useState, useMemo, useEffect } from 'react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PencilIcon, TrashIcon, PlusIcon } from "lucide-react";
import { mockConfigParams, mockBusinessLines, ConfigParam, BusinessLine } from '../types/configParam';
import { useToast } from "@/components/ui/use-toast";
import DataPagination from '@/components/common/DataPagination';

const ConfigParamManagement = () => {
  const [configParams, setConfigParams] = useState<ConfigParam[]>(mockConfigParams);
  const [businessLines] = useState<BusinessLine[]>(mockBusinessLines);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentParam, setCurrentParam] = useState<ConfigParam | null>(null);
  const [newParam, setNewParam] = useState<Partial<ConfigParam>>({
    businessLineId: '',
    type: '',
    key: '',
    value: '',
  });
  const [filters, setFilters] = useState({
    businessLineId: '',
    type: '',
    key: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { toast } = useToast();

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Get unique types from the config params
  const uniqueTypes = useMemo(() => {
    const types = new Set<string>();
    configParams.forEach(param => types.add(param.type));
    return Array.from(types);
  }, [configParams]);

  // Get unique keys from the config params
  const uniqueKeys = useMemo(() => {
    const keys = new Set<string>();
    configParams.forEach(param => keys.add(param.key));
    return Array.from(keys);
  }, [configParams]);

  // Filter config params based on the filter criteria
  const filteredParams = useMemo(() => {
    return configParams.filter(param => {
      const matchBusinessLine = !filters.businessLineId || filters.businessLineId === 'all' || param.businessLineId === filters.businessLineId;
      const matchType = !filters.type || filters.type === 'all' || param.type === filters.type;
      const matchKey = !filters.key || filters.key === 'all' || param.key === filters.key;
      return matchBusinessLine && matchType && matchKey;
    });
  }, [configParams, filters]);

  // Get paginated data
  const paginatedParams = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredParams.slice(startIndex, startIndex + pageSize);
  }, [filteredParams, currentPage, pageSize]);

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(filteredParams.length / pageSize));

  const handleAddParam = () => {
    if (!newParam.businessLineId || !newParam.type || !newParam.key || !newParam.value) {
      toast({
        title: "Validation Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    // Check if parameter with the same business line, type, and key already exists
    const paramExists = configParams.some(p => 
      p.businessLineId === newParam.businessLineId && 
      p.type === newParam.type && 
      p.key === newParam.key
    );

    if (paramExists) {
      toast({
        title: "Validation Error",
        description: "A parameter with the same business line, type, and key already exists",
        variant: "destructive",
      });
      return;
    }

    const businessLine = businessLines.find(bl => bl.id === newParam.businessLineId);
    
    const param: ConfigParam = {
      id: String(Date.now()),
      businessLineId: newParam.businessLineId!,
      businessLineName: businessLine?.name,
      type: newParam.type!,
      key: newParam.key!,
      value: newParam.value!,
    };

    setConfigParams([...configParams, param]);
    setNewParam({
      businessLineId: '',
      type: '',
      key: '',
      value: '',
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Parameter Added",
      description: `Parameter "${param.key}" has been created successfully.`,
    });
  };

  const handleEditParam = () => {
    if (!currentParam || !currentParam.businessLineId || !currentParam.type || !currentParam.key || !currentParam.value) {
      toast({
        title: "Validation Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    // Check if parameter with the same business line, type, and key already exists (excluding the current one)
    const paramExists = configParams.some(p => 
      p.id !== currentParam.id &&
      p.businessLineId === currentParam.businessLineId && 
      p.type === currentParam.type && 
      p.key === currentParam.key
    );

    if (paramExists) {
      toast({
        title: "Validation Error",
        description: "A parameter with the same business line, type, and key already exists",
        variant: "destructive",
      });
      return;
    }

    const businessLine = businessLines.find(bl => bl.id === currentParam.businessLineId);

    setConfigParams(
      configParams.map((p) =>
        p.id === currentParam.id ? {
          ...currentParam,
          businessLineName: businessLine?.name
        } : p
      )
    );
    setIsEditDialogOpen(false);
    
    toast({
      title: "Parameter Updated",
      description: `Parameter "${currentParam.key}" has been updated successfully.`,
    });
  };

  const handleDeleteParam = () => {
    if (!currentParam) return;
    
    setConfigParams(configParams.filter((p) => p.id !== currentParam.id));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Parameter Deleted",
      description: `Parameter "${currentParam.key}" has been deleted successfully.`,
    });
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      businessLineId: '',
      type: '',
      key: '',
    });
    
    toast({
      title: "Filters Cleared",
      description: "All filters have been cleared.",
    });
  };

  return (
    <div className="p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-light">Configuration Parameters</h1>
        <div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Parameter
          </Button>
        </div>
      </div>

      {/* Inline filters */}
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="filter-businessLine" className="mb-2 block">
              Business Line
            </Label>
            <Select
              value={filters.businessLineId}
              onValueChange={(value) => setFilters({ ...filters, businessLineId: value })}
            >
              <SelectTrigger id="filter-businessLine">
                <SelectValue placeholder="All business lines" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All business lines</SelectItem>
                {businessLines.map((bl) => (
                  <SelectItem key={bl.id} value={bl.id}>
                    {bl.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="filter-type" className="mb-2 block">
              Type
            </Label>
            <Select
              value={filters.type}
              onValueChange={(value) => setFilters({ ...filters, type: value })}
            >
              <SelectTrigger id="filter-type">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {uniqueTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="filter-key" className="mb-2 block">
              Key
            </Label>
            <Select
              value={filters.key}
              onValueChange={(value) => setFilters({ ...filters, key: value })}
            >
              <SelectTrigger id="filter-key">
                <SelectValue placeholder="All keys" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All keys</SelectItem>
                {uniqueKeys.map((key) => (
                  <SelectItem key={key} value={key}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end">
            <Button variant="outline" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Business Line</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Key</TableHead>
            <TableHead>Value</TableHead>
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedParams.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10">
                No parameters found matching your criteria
              </TableCell>
            </TableRow>
          ) : (
            paginatedParams.map((param) => (
              <TableRow key={param.id}>
                <TableCell className="font-medium">{param.businessLineName}</TableCell>
                <TableCell>{param.type}</TableCell>
                <TableCell>{param.key}</TableCell>
                <TableCell>{param.value}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setCurrentParam(param);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setCurrentParam(param);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <DataPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        totalItems={filteredParams.length}
        onPageSizeChange={setPageSize}
        showPageSize={true}
      />

      {/* Add Parameter Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Parameter</DialogTitle>
            <DialogDescription>
              Create a new configuration parameter.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="businessLine" className="text-right">
                Business Line
              </Label>
              <div className="col-span-3">
                <Select
                  value={newParam.businessLineId}
                  onValueChange={(value) =>
                    setNewParam({ ...newParam, businessLineId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business line" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessLines.map((bl) => (
                      <SelectItem key={bl.id} value={bl.id}>
                        {bl.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Input
                id="type"
                value={newParam.type}
                onChange={(e) =>
                  setNewParam({ ...newParam, type: e.target.value })
                }
                className="col-span-3"
                placeholder="Enter parameter type"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="key" className="text-right">
                Key
              </Label>
              <Input
                id="key"
                value={newParam.key}
                onChange={(e) =>
                  setNewParam({ ...newParam, key: e.target.value })
                }
                className="col-span-3"
                placeholder="Enter parameter key"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Value
              </Label>
              <Input
                id="value"
                value={newParam.value}
                onChange={(e) =>
                  setNewParam({ ...newParam, value: e.target.value })
                }
                className="col-span-3"
                placeholder="Enter parameter value"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddParam}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Parameter Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Parameter</DialogTitle>
            <DialogDescription>
              Update parameter details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-businessLine" className="text-right">
                Business Line
              </Label>
              <div className="col-span-3">
                <Select
                  value={currentParam?.businessLineId || ''}
                  onValueChange={(value) =>
                    setCurrentParam(
                      currentParam
                        ? { ...currentParam, businessLineId: value }
                        : null
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business line" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessLines.map((bl) => (
                      <SelectItem key={bl.id} value={bl.id}>
                        {bl.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-type" className="text-right">
                Type
              </Label>
              <Input
                id="edit-type"
                value={currentParam?.type || ''}
                onChange={(e) =>
                  setCurrentParam(
                    currentParam
                      ? { ...currentParam, type: e.target.value }
                      : null
                  )
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-key" className="text-right">
                Key
              </Label>
              <Input
                id="edit-key"
                value={currentParam?.key || ''}
                onChange={(e) =>
                  setCurrentParam(
                    currentParam
                      ? { ...currentParam, key: e.target.value }
                      : null
                  )
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-value" className="text-right">
                Value
              </Label>
              <Input
                id="edit-value"
                value={currentParam?.value || ''}
                onChange={(e) =>
                  setCurrentParam(
                    currentParam
                      ? { ...currentParam, value: e.target.value }
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
            <Button onClick={handleEditParam}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Parameter Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Parameter</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this parameter?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteParam}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfigParamManagement;
