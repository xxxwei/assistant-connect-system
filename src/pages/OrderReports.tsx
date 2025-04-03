
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';
import { cn } from "@/lib/utils";

// Mock data for charts and reports
const mockMonthlyBookings = [
  { month: 'Jan', total: 28, booking: 22, publicService: 6 },
  { month: 'Feb', total: 32, booking: 27, publicService: 5 },
  { month: 'Mar', total: 35, booking: 28, publicService: 7 },
  { month: 'Apr', total: 31, booking: 25, publicService: 6 },
  { month: 'May', total: 38, booking: 30, publicService: 8 },
  { month: 'Jun', total: 42, booking: 35, publicService: 7 },
];

const mockStatusBreakdown = [
  { name: 'Submitted', value: 25, color: '#FBBF24' },
  { name: 'Started', value: 38, color: '#3B82F6' },
  { name: 'Finished', value: 37, color: '#10B981' },
];

const mockRevenueData = [
  { month: 'Jan', maac: 3200, nonMaac: 4800, total: 8000 },
  { month: 'Feb', maac: 3800, nonMaac: 5200, total: 9000 },
  { month: 'Mar', maac: 4200, nonMaac: 5800, total: 10000 },
  { month: 'Apr', maac: 3600, nonMaac: 5400, total: 9000 },
  { month: 'May', maac: 4500, nonMaac: 6500, total: 11000 },
  { month: 'Jun', maac: 5000, nonMaac: 7000, total: 12000 },
];

const mockTaxByProvince = [
  { province: 'Ontario', tax: 1250.45 },
  { province: 'Quebec', tax: 980.32 },
  { province: 'British Columbia', tax: 875.15 },
  { province: 'Alberta', tax: 725.80 },
  { province: 'Nova Scotia', tax: 320.25 },
  { province: 'Manitoba', tax: 290.10 },
];

const mockPayoutData = [
  { 
    payee_id: 'reviewer_123', 
    name: 'John Smith',
    email: 'john@example.com',
    total_assigned: 4850.75, 
    paid: 4250.50,
    unpaid: 600.25,
    payments: 12
  },
  { 
    payee_id: 'reviewer_456', 
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    total_assigned: 3675.25, 
    paid: 3675.25,
    unpaid: 0,
    payments: 9
  },
  { 
    payee_id: 'reviewer_789', 
    name: 'Michael Brown',
    email: 'michael@example.com',
    total_assigned: 5210.50, 
    paid: 4500.00,
    unpaid: 710.50,
    payments: 15
  },
  { 
    payee_id: 'reviewer_101', 
    name: 'Jessica Davis',
    email: 'jessica@example.com',
    total_assigned: 2980.00, 
    paid: 2980.00,
    unpaid: 0,
    payments: 8
  },
  { 
    payee_id: 'reviewer_202', 
    name: 'Robert Wilson',
    email: 'robert@example.com',
    total_assigned: 3450.75, 
    paid: 3100.25,
    unpaid: 350.50,
    payments: 10
  },
];

const OrderReports = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [payoutFilter, setPayoutFilter] = useState('all');
  
  // Functions to filter data based on time range (would connect to real API in production)
  const getFilteredBookingData = () => {
    return mockMonthlyBookings;
  };
  
  const getFilteredRevenueData = () => {
    return mockRevenueData;
  };
  
  const getFilteredPayoutData = () => {
    if (payoutFilter === 'unpaid') {
      return mockPayoutData.filter(item => item.unpaid > 0);
    }
    return mockPayoutData;
  };
  
  const formatCurrency = (value) => {
    return `$${value.toFixed(2)}`;
  };
  
  const exportToCSV = (data, filename) => {
    // In a real app, this would generate a CSV file for download
    console.log(`Exporting ${filename} with data:`, data);
    
    // For demo, just show an alert
    alert(`CSV export triggered for ${filename}`);
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Order Reports & Analytics</h1>
        <p className="text-muted-foreground">View and analyze order data and financial metrics</p>
      </div>
      
      <div className="mb-6 flex justify-end">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="bookings">
        <TabsList className="mb-4 bg-muted">
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="payouts">Reviewer Payouts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
                <CardDescription>Total bookings in selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {mockMonthlyBookings.reduce((sum, item) => sum + item.total, 0)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Bookings: {mockMonthlyBookings.reduce((sum, item) => sum + item.booking, 0)} | 
                  Public Service: {mockMonthlyBookings.reduce((sum, item) => sum + item.publicService, 0)}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Status Breakdown</CardTitle>
                <CardDescription>Current status of all bookings</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="flex items-center space-x-4">
                  {mockStatusBreakdown.map((status) => (
                    <div key={status.name} className="text-center">
                      <div className="text-2xl font-bold">{status.value}</div>
                      <div 
                        className="px-2 py-1 rounded text-xs font-medium mt-1"
                        style={{ backgroundColor: `${status.color}20`, color: status.color }}
                      >
                        {status.name}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Event Type Distribution</CardTitle>
                <CardDescription>Breakdown by type</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div style={{ width: '100%', height: 150 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Booking', value: mockMonthlyBookings.reduce((sum, item) => sum + item.booking, 0), color: '#8884d8' },
                          { name: 'Public Service', value: mockMonthlyBookings.reduce((sum, item) => sum + item.publicService, 0), color: '#82ca9d' }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { name: 'Booking', value: mockMonthlyBookings.reduce((sum, item) => sum + item.booking, 0), color: '#8884d8' },
                          { name: 'Public Service', value: mockMonthlyBookings.reduce((sum, item) => sum + item.publicService, 0), color: '#82ca9d' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Monthly Booking Trends</CardTitle>
              <CardDescription>Number of bookings over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <BarChart
                    data={getFilteredBookingData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="booking" stackId="a" name="Bookings" fill="#8884d8" />
                    <Bar dataKey="publicService" stackId="a" name="Public Service" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
                <CardDescription>For selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ${mockRevenueData.reduce((sum, item) => sum + item.total, 0).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {mockRevenueData.length} months
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>MAAC vs Non-MAAC</CardTitle>
                <CardDescription>Revenue breakdown by membership</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold">MAAC Members</div>
                    <div className="text-2xl font-bold text-blue-600">
                      ${mockRevenueData.reduce((sum, item) => sum + item.maac, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round(mockRevenueData.reduce((sum, item) => sum + item.maac, 0) / mockRevenueData.reduce((sum, item) => sum + item.total, 0) * 100)}% of total
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">Non-MAAC</div>
                    <div className="text-2xl font-bold text-purple-600">
                      ${mockRevenueData.reduce((sum, item) => sum + item.nonMaac, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round(mockRevenueData.reduce((sum, item) => sum + item.nonMaac, 0) / mockRevenueData.reduce((sum, item) => sum + item.total, 0) * 100)}% of total
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Average Order Value</CardTitle>
                <CardDescription>Per booking type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold">Regular</div>
                    <div className="text-2xl font-bold text-green-600">
                      $149.99
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">Public Service</div>
                    <div className="text-2xl font-bold text-amber-600">
                      $99.99
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>Revenue breakdown over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart
                      data={getFilteredRevenueData()}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                      <Legend />
                      <Bar dataKey="maac" stackId="a" name="MAAC Members" fill="#3B82F6" />
                      <Bar dataKey="nonMaac" stackId="a" name="Non-MAAC" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Tax by Province</CardTitle>
                  <CardDescription>Total tax collected by province</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => exportToCSV(mockTaxByProvince, 'tax_by_province.csv')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Province</TableHead>
                      <TableHead className="text-right">Tax Amount</TableHead>
                      <TableHead className="text-right">% of Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTaxByProvince.map((item) => {
                      const totalTax = mockTaxByProvince.reduce((sum, province) => sum + province.tax, 0);
                      const percentage = (item.tax / totalTax * 100).toFixed(1);
                      
                      return (
                        <TableRow key={item.province}>
                          <TableCell>{item.province}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.tax)}</TableCell>
                          <TableCell className="text-right">{percentage}%</TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow className="font-medium">
                      <TableCell>Total</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(mockTaxByProvince.reduce((sum, item) => sum + item.tax, 0))}
                      </TableCell>
                      <TableCell className="text-right">100%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="payouts" className="space-y-4">
          <div className="mb-4 flex justify-between items-center">
            <Select value={payoutFilter} onValueChange={setPayoutFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter payouts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payouts</SelectItem>
                <SelectItem value="unpaid">Unpaid Only</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={() => exportToCSV(getFilteredPayoutData(), 'reviewer_payouts.csv')}>
              <Download className="h-4 w-4 mr-2" />
              Export as CSV
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Reviewer Payout Summary</CardTitle>
              <CardDescription>
                Total amounts assigned and paid to each reviewer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reviewer ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Total Assigned</TableHead>
                    <TableHead className="text-right">Paid</TableHead>
                    <TableHead className="text-right">Unpaid</TableHead>
                    <TableHead className="text-center"># Payments</TableHead>
                    <TableHead className="text-right">Payment Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredPayoutData().map((item) => (
                    <TableRow key={item.payee_id}>
                      <TableCell className="font-medium">{item.payee_id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.total_assigned)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.paid)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.unpaid)}</TableCell>
                      <TableCell className="text-center">{item.payments}</TableCell>
                      <TableCell className="text-right">
                        {item.unpaid === 0 ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            Fully Paid
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                            Partially Paid
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {getFilteredPayoutData().length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                        No payout data found for the selected filter
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              
              {getFilteredPayoutData().length > 0 && (
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Total Assigned</div>
                      <div className="text-lg font-bold">
                        {formatCurrency(getFilteredPayoutData().reduce((sum, item) => sum + item.total_assigned, 0))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Total Paid</div>
                      <div className="text-lg font-bold">
                        {formatCurrency(getFilteredPayoutData().reduce((sum, item) => sum + item.paid, 0))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Total Unpaid</div>
                      <div className="text-lg font-bold">
                        {formatCurrency(getFilteredPayoutData().reduce((sum, item) => sum + item.unpaid, 0))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Payout Distribution</CardTitle>
              <CardDescription>Visualization of paid vs unpaid amounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <BarChart
                    data={getFilteredPayoutData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                    <Legend />
                    <Bar dataKey="paid" name="Paid" fill="#10B981" />
                    <Bar dataKey="unpaid" name="Unpaid" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderReports;
