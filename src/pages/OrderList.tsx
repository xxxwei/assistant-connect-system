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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Search, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import DataPagination from "@/components/common/DataPagination";
import OrderListHeader from "@/components/orders/OrderListHeader";
import { Link } from "react-router-dom";

const mockOrders = Array.from({ length: 50 }).map((_, index) => ({
  id: `order-${index + 1}`,
  reviewer_email: `reviewer${index + 1}@example.com`,
  reviewer_name: `Reviewer ${index + 1}`,
  customer_email: `customer${index + 1}@example.com`,
  customer_name: `Customer ${index + 1}`,
  event_type: Math.random() > 0.3 ? 0 : 1, // 0 = booking, 1 = public service
  event_status: Math.floor(Math.random() * 3), // 0 = submitted, 1 = started, 2 = finished
  payment_status: Math.random() > 0.2,
  create_time: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  payment_id: `pay_${Math.random().toString(36).substring(2, 10)}`
}));

const OrderList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  
  const [reviewerEmail, setReviewerEmail] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventStatus, setEventStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    setOrders(mockOrders);
    
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')) : 1;
    const size = searchParams.get('size') ? parseInt(searchParams.get('size')) : 10;
    
    setCurrentPage(page);
    setPageSize(size);
    
    if (searchParams.get('reviewerEmail')) setReviewerEmail(searchParams.get('reviewerEmail'));
    if (searchParams.get('customerEmail')) setCustomerEmail(searchParams.get('customerEmail'));
    if (searchParams.get('eventType')) setEventType(searchParams.get('eventType'));
    if (searchParams.get('eventStatus')) setEventStatus(searchParams.get('eventStatus'));
    if (searchParams.get('paymentStatus')) setPaymentStatus(searchParams.get('paymentStatus'));
    if (searchParams.get('startDate')) setStartDate(new Date(searchParams.get('startDate')));
    if (searchParams.get('endDate')) setEndDate(new Date(searchParams.get('endDate')));
  }, []);

  useEffect(() => {
    let result = [...orders];
    
    if (reviewerEmail) {
      result = result.filter(order => 
        order.reviewer_email.toLowerCase().includes(reviewerEmail.toLowerCase())
      );
    }
    
    if (customerEmail) {
      result = result.filter(order => 
        order.customer_email.toLowerCase().includes(customerEmail.toLowerCase())
      );
    }
    
    if (eventType !== "") {
      result = result.filter(order => 
        order.event_type === parseInt(eventType)
      );
    }
    
    if (eventStatus !== "") {
      result = result.filter(order => 
        order.event_status === parseInt(eventStatus)
      );
    }
    
    if (paymentStatus !== "") {
      const paid = paymentStatus === "true";
      result = result.filter(order => order.payment_status === paid);
    }
    
    if (startDate) {
      result = result.filter(order => 
        new Date(order.create_time) >= startDate
      );
    }
    
    if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      result = result.filter(order => 
        new Date(order.create_time) <= endOfDay
      );
    }
    
    setTotalItems(result.length);
    setTotalPages(Math.ceil(result.length / pageSize));
    
    const startIndex = (currentPage - 1) * pageSize;
    setFilteredOrders(result.slice(startIndex, startIndex + pageSize));
    
    const params = new URLSearchParams();
    params.set('page', currentPage.toString());
    params.set('size', pageSize.toString());
    
    if (reviewerEmail) params.set('reviewerEmail', reviewerEmail);
    if (customerEmail) params.set('customerEmail', customerEmail);
    if (eventType !== "") params.set('eventType', eventType);
    if (eventStatus !== "") params.set('eventStatus', eventStatus);
    if (paymentStatus !== "") params.set('paymentStatus', paymentStatus);
    if (startDate) params.set('startDate', startDate.toISOString().split('T')[0]);
    if (endDate) params.set('endDate', endDate.toISOString().split('T')[0]);
    
    setSearchParams(params);
  }, [orders, currentPage, pageSize, reviewerEmail, customerEmail, eventType, eventStatus, paymentStatus, startDate, endDate]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setReviewerEmail("");
    setCustomerEmail("");
    setEventType("");
    setEventStatus("");
    setPaymentStatus("");
    setStartDate(null);
    setEndDate(null);
    setCurrentPage(1);
  };

  const getEventTypeLabel = (type) => {
    return type === 0 ? "Booking" : "Public Service";
  };

  const getEventStatusLabel = (status) => {
    switch (status) {
      case 0: return "Submitted";
      case 1: return "Started";
      case 2: return "Finished";
      default: return "Unknown";
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM dd, yyyy HH:mm");
  };

  return (
    <div className="p-6">
      <OrderListHeader />
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Reviewer Email</label>
            <div className="flex">
              <Input
                placeholder="Filter by reviewer email"
                value={reviewerEmail}
                onChange={(e) => setReviewerEmail(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Customer Email</label>
            <Input
              placeholder="Filter by customer email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Event Type</label>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger>
                <SelectValue placeholder="All Event Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="0">Booking</SelectItem>
                <SelectItem value="1">Public Service</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Event Status</label>
            <Select value={eventStatus} onValueChange={setEventStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="0">Submitted</SelectItem>
                <SelectItem value="1">Started</SelectItem>
                <SelectItem value="2">Finished</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Payment Status</label>
            <Select value={paymentStatus} onValueChange={setPaymentStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Payment Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="true">Paid</SelectItem>
                <SelectItem value="false">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Date Range</label>
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Start date"}
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
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "End date"}
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
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleClearFilters}>Clear Filters</Button>
          <Button onClick={handleSearch} className="flex items-center">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Reviewer</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Event Type</TableHead>
              <TableHead>Event Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id.substring(0, 10)}</TableCell>
                <TableCell>
                  <div className="font-medium">{order.reviewer_name}</div>
                  <div className="text-xs text-muted-foreground">{order.reviewer_email}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{order.customer_name}</div>
                  <div className="text-xs text-muted-foreground">{order.customer_email}</div>
                </TableCell>
                <TableCell>{getEventTypeLabel(order.event_type)}</TableCell>
                <TableCell>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    order.event_status === 0 && "bg-yellow-100 text-yellow-800",
                    order.event_status === 1 && "bg-blue-100 text-blue-800",
                    order.event_status === 2 && "bg-green-100 text-green-800"
                  )}>
                    {getEventStatusLabel(order.event_status)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    order.payment_status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  )}>
                    {order.payment_status ? "Paid" : "Unpaid"}
                  </span>
                </TableCell>
                <TableCell>{formatDate(order.create_time)}</TableCell>
                <TableCell className="text-right">
                  <Link to={`/orders/${order.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No orders found matching your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        <DataPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={handlePageChange}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={[5, 10, 25, 50]}
          showPageSize={true}
        />
      </div>
    </div>
  );
};

export default OrderList;
