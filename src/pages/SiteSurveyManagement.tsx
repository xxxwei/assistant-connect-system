
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DataPagination from "@/components/common/DataPagination";
import { Calendar as CalendarIcon, Search, Trash2, Eye, Map, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SiteSurvey, surveyTypes } from "@/types/siteSurvey";
import SiteSurveyListHeader from "@/components/site-survey/SiteSurveyListHeader";

// Mock data for site surveys
const mockSiteSurveys: SiteSurvey[] = Array.from({ length: 30 }).map((_, index) => ({
  id: `survey-${index + 1}`,
  title: `Site Survey ${index + 1}`,
  mission_reference_no: `MSN-${Math.floor(Math.random() * 10000)}`,
  user_id: `user-${Math.floor(Math.random() * 100)}`,
  email: `user${index + 1}@example.com`,
  startLocal: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  endLocal: new Date(Date.now() + Math.random() * 10000000000).toISOString(),
  survey_type: surveyTypes[Math.floor(Math.random() * surveyTypes.length)],
  drone_id: `drone-${Math.floor(Math.random() * 20)}`,
  pilotname: `Pilot ${Math.floor(Math.random() * 10) + 1}`,
  latitude: 40 + Math.random() * 10,
  longitude: -120 + Math.random() * 40,
  controlled: Math.random() > 0.5,
  
  // Additional fields
  phone: `555-${Math.floor(Math.random() * 9000) + 1000}`,
  adminEmail: 'admin@example.com',
  customer_name: `Customer ${index + 1}`,
  markers: JSON.stringify([
    { lat: 41 + Math.random(), lng: -110 + Math.random() * 10 },
    { lat: 41 + Math.random(), lng: -110 + Math.random() * 10 }
  ])
}));

const SiteSurveyManagement: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [siteSurveys, setSiteSurveys] = useState<SiteSurvey[]>([]);
  const [filteredSurveys, setFilteredSurveys] = useState<SiteSurvey[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  
  // Filter states
  const [searchText, setSearchText] = useState("");
  const [surveyType, setSurveyType] = useState("");
  const [droneId, setDroneId] = useState("");
  const [controlled, setControlled] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  // Available drone IDs (from mock data)
  const availableDroneIds = Array.from(new Set(mockSiteSurveys.map(survey => survey.drone_id)));

  useEffect(() => {
    // In a real app, fetch site surveys from API
    setSiteSurveys(mockSiteSurveys);
    
    // Initialize from URL params if any
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
    const size = searchParams.get('size') ? parseInt(searchParams.get('size') as string) : 10;
    
    setCurrentPage(page);
    setPageSize(size);
    
    // Get filter values from URL if present
    if (searchParams.get('search')) setSearchText(searchParams.get('search') as string);
    if (searchParams.get('surveyType')) setSurveyType(searchParams.get('surveyType') as string);
    if (searchParams.get('droneId')) setDroneId(searchParams.get('droneId') as string);
    if (searchParams.get('controlled')) setControlled(searchParams.get('controlled') as string);
    if (searchParams.get('startDate')) setStartDate(new Date(searchParams.get('startDate') as string));
    if (searchParams.get('endDate')) setEndDate(new Date(searchParams.get('endDate') as string));
  }, []);

  useEffect(() => {
    // Apply filters
    let result = [...siteSurveys];
    
    if (searchText) {
      const search = searchText.toLowerCase();
      result = result.filter(survey => 
        survey.user_id.toLowerCase().includes(search) ||
        survey.email.toLowerCase().includes(search) ||
        survey.mission_reference_no.toLowerCase().includes(search)
      );
    }
    
    if (surveyType && surveyType !== "all") {
      result = result.filter(survey => survey.survey_type === surveyType);
    }
    
    if (droneId && droneId !== "all") {
      result = result.filter(survey => survey.drone_id === droneId);
    }
    
    if (controlled && controlled !== "all") {
      const isControlled = controlled === "true";
      result = result.filter(survey => survey.controlled === isControlled);
    }
    
    if (startDate) {
      result = result.filter(survey => 
        new Date(survey.startLocal) >= startDate
      );
    }
    
    if (endDate) {
      // Add one day to include the end date fully
      const nextDay = new Date(endDate);
      nextDay.setDate(nextDay.getDate() + 1);
      result = result.filter(survey => 
        new Date(survey.endLocal) <= nextDay
      );
    }
    
    setTotalItems(result.length);
    setTotalPages(Math.ceil(result.length / pageSize));
    
    // Apply pagination
    const startIndex = (currentPage - 1) * pageSize;
    setFilteredSurveys(result.slice(startIndex, startIndex + pageSize));
    
    // Update URL params
    const params = new URLSearchParams();
    params.set('page', currentPage.toString());
    params.set('size', pageSize.toString());
    
    if (searchText) params.set('search', searchText);
    if (surveyType && surveyType !== "all") params.set('surveyType', surveyType);
    if (droneId && droneId !== "all") params.set('droneId', droneId);
    if (controlled && controlled !== "all") params.set('controlled', controlled);
    if (startDate) params.set('startDate', startDate.toISOString());
    if (endDate) params.set('endDate', endDate.toISOString());
    
    setSearchParams(params);
    
  }, [siteSurveys, currentPage, pageSize, searchText, surveyType, droneId, controlled, startDate, endDate]);

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleClearFilters = () => {
    setSearchText("");
    setSurveyType("");
    setDroneId("");
    setControlled("");
    setStartDate(null);
    setEndDate(null);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  return (
    <div className="p-6">
      <SiteSurveyListHeader />
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="User ID, Email, Mission Reference..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="survey-type">Survey Type</Label>
            <Select
              value={surveyType}
              onValueChange={setSurveyType}
            >
              <SelectTrigger id="survey-type">
                <SelectValue placeholder="All Survey Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {surveyTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="drone-id">Drone ID</Label>
            <Select
              value={droneId}
              onValueChange={setDroneId}
            >
              <SelectTrigger id="drone-id">
                <SelectValue placeholder="All Drones" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Drones</SelectItem>
                {availableDroneIds.map((id) => (
                  <SelectItem key={id} value={id}>{id}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="controlled">Controlled Airspace</Label>
            <Select
              value={controlled}
              onValueChange={setControlled}
            >
              <SelectTrigger id="controlled">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <Label>End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <Button type="button" onClick={handleSearch}>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button type="button" variant="outline" onClick={handleClearFilters}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        </div>
      </div>
      
      {/* Survey Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Mission Ref</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Survey Type</TableHead>
              <TableHead>Drone ID</TableHead>
              <TableHead>Pilot</TableHead>
              <TableHead>Controlled</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSurveys.length > 0 ? (
              filteredSurveys.map((survey) => (
                <TableRow key={survey.id}>
                  <TableCell className="font-medium">{survey.title}</TableCell>
                  <TableCell>{survey.mission_reference_no}</TableCell>
                  <TableCell>{survey.user_id}</TableCell>
                  <TableCell>{survey.email}</TableCell>
                  <TableCell>{formatDate(survey.startLocal)}</TableCell>
                  <TableCell>{formatDate(survey.endLocal)}</TableCell>
                  <TableCell className="capitalize">{survey.survey_type}</TableCell>
                  <TableCell>{survey.drone_id}</TableCell>
                  <TableCell>{survey.pilotname}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${survey.controlled ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {survey.controlled ? 'Yes' : 'No'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link to={`/site-surveys/${survey.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`/site-surveys/${survey.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          <Map className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-6">
                  No site surveys found matching your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        <div className="p-4 border-t">
          <DataPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageSizeChange={handlePageSizeChange}
            showPageSize={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SiteSurveyManagement;
