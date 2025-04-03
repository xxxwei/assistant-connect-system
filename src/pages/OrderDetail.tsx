
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, ExternalLink, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Mock data for demo
const mockOrder = {
  id: "order-123456",
  reviewer_email: "reviewer@example.com",
  reviewer_name: "Test Reviewer",
  reviewer_phone: "+1 (555) 123-4567",
  customer_email: "customer@example.com",
  customer_name: "Test Customer",
  customer_phone: "+1 (555) 987-6543",
  booking_start_time: new Date().toISOString(),
  booking_end_time: new Date(Date.now() + 3600000).toISOString(),
  review_address: "123 Test Street, Test City, AA 12345",
  review_timezone: "America/New_York",
  address_customized: true,
  address_id: "addr_123456",
  maac_member_flag: true,
  maac_member_discount_flag: true,
  total: 149.99,
  event_type: 0, // 0 = booking, 1 = public service
  event_status: 1, // 0 = submitted, 1 = started, 2 = finished
  payment_status: true,
  create_time: new Date(Date.now() - 86400000).toISOString(),
  payment_id: "pay_98765432"
};

const mockPayment = {
  id: "pay_98765432",
  payer_id: "user_12345",
  customer_id: "cus_67890",
  price: 139.99,
  tax_rate: 0.07,
  tax: 9.80,
  total: 149.79,
  payment_status: 1, // 0 = unpaid, 1 = paid
  province: "Ontario",
  payment_type: "credit_card",
  invoice_id: "inv_98765432"
};

const mockInvoice = {
  id: "inv_98765432",
  status: "paid",
  amount_due: 149.79,
  amount_paid: 149.79,
  payment_method: "Visa ending in 4242",
  customer_email: "customer@example.com",
  hosted_invoice_url: "https://pay.stripe.com/invoice/example",
  payment_time: new Date(Date.now() - 60000).toISOString()
};

const mockPayouts = [
  {
    id: "po_123456",
    payment_id: "pay_98765432",
    payee_id: "reviewer_123",
    connected_account_id: "acct_123456",
    amount: 119.99,
    paid: true,
    paid_time: new Date(Date.now() - 30000).toISOString(),
    transfer_id: "tr_123456"
  },
  {
    id: "po_123457",
    payment_id: "pay_98765432",
    payee_id: "platform_123",
    connected_account_id: "acct_platform",
    amount: 29.80,
    paid: true,
    paid_time: new Date(Date.now() - 30000).toISOString(),
    transfer_id: "tr_123457"
  }
];

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [payment, setPayment] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [payouts, setPayouts] = useState([]);
  const [activeTab, setActiveTab] = useState("details");
  
  useEffect(() => {
    // In a real app, fetch order from API using id
    // For demo, just use mock data
    setOrder(mockOrder);
    setPayment(mockPayment);
    setInvoice(mockInvoice);
    setPayouts(mockPayouts);
  }, [id]);
  
  if (!order) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[60vh]">
        <div className="text-xl text-muted-foreground">Loading order details...</div>
      </div>
    );
  }
  
  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM dd, yyyy HH:mm");
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
  
  const getPaymentStatusBadge = (status) => {
    return status ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
        <CheckCircle2 className="h-3 w-3 mr-1" />
        Paid
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
        <XCircle className="h-3 w-3 mr-1" />
        Unpaid
      </Badge>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/orders">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Order: {order.id}</h1>
            <p className="text-muted-foreground">Created: {formatDate(order.create_time)}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className={cn(
              "text-xs",
              order.event_status === 0 && "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
              order.event_status === 1 && "bg-blue-100 text-blue-800 hover:bg-blue-200",
              order.event_status === 2 && "bg-green-100 text-green-800 hover:bg-green-200"
            )}>
              {getEventStatusLabel(order.event_status)}
            </Badge>
            <Badge className={cn(
              "text-xs",
              order.event_type === 0 ? "bg-purple-100 text-purple-800 hover:bg-purple-200" : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
            )}>
              {getEventTypeLabel(order.event_type)}
            </Badge>
            {getPaymentStatusBadge(order.payment_status)}
            {order.maac_member_flag && (
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">MAAC Member</Badge>
            )}
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="details" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4 bg-muted">
          <TabsTrigger value="details">Order Details</TabsTrigger>
          <TabsTrigger value="payment">Payment & Payout</TabsTrigger>
          <TabsTrigger value="users">User Information</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Order Main Info */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Information</CardTitle>
                <CardDescription>Details about this flight review booking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium">Event Type</div>
                    <div>{getEventTypeLabel(order.event_type)}</div>
                  </div>
                  <div>
                    <div className="font-medium">Event Status</div>
                    <div>{getEventStatusLabel(order.event_status)}</div>
                  </div>
                  <div>
                    <div className="font-medium">Payment Status</div>
                    <div className="flex items-center mt-1">
                      {getPaymentStatusBadge(order.payment_status)}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Total Amount</div>
                    <div>${order.total.toFixed(2)}</div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="font-medium">Booking Time</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    <div>
                      <div className="text-xs text-muted-foreground">Start</div>
                      <div>{formatDate(order.booking_start_time)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">End</div>
                      <div>{formatDate(order.booking_end_time)}</div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="font-medium">Review Address</div>
                  <div className="mt-1">{order.review_address}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Timezone: {order.review_timezone}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {order.address_customized ? "Custom address" : "Selected from address book"} (ID: {order.address_id})
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="font-medium">MAAC Information</div>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <div>
                      <div className="text-xs text-muted-foreground">MAAC Member</div>
                      <div>{order.maac_member_flag ? "Yes" : "No"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Discount Applied</div>
                      <div>{order.maac_member_discount_flag ? "Yes" : "No"}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Time and Location */}
            <Card>
              <CardHeader>
                <CardTitle>Reviewer and Customer</CardTitle>
                <CardDescription>Information about the parties involved</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="font-medium mb-2">Reviewer</div>
                  <div className="space-y-1">
                    <div className="text-lg">{order.reviewer_name}</div>
                    <div className="text-muted-foreground">{order.reviewer_email}</div>
                    <div className="text-muted-foreground">{order.reviewer_phone}</div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="font-medium mb-2">Customer</div>
                  <div className="space-y-1">
                    <div className="text-lg">{order.customer_name}</div>
                    <div className="text-muted-foreground">{order.customer_email}</div>
                    <div className="text-muted-foreground">{order.customer_phone}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-4">
          {payment && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Payment Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>Details about payment for this order</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="font-medium">Payer ID</div>
                      <div>{payment.payer_id}</div>
                    </div>
                    <div>
                      <div className="font-medium">Customer ID</div>
                      <div>{payment.customer_id}</div>
                    </div>
                    <div>
                      <div className="font-medium">Province</div>
                      <div>{payment.province}</div>
                    </div>
                    <div>
                      <div className="font-medium">Payment Type</div>
                      <div className="capitalize">{payment.payment_type.replace("_", " ")}</div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="font-medium">Price Breakdown</div>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between">
                        <span>Base Price</span>
                        <span>${payment.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax Rate</span>
                        <span>{(payment.tax_rate * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax Amount</span>
                        <span>${payment.tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${payment.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="font-medium">Status</div>
                    <div className="mt-1">
                      {payment.payment_status === 1 ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Paid
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                          <XCircle className="h-3 w-3 mr-1" />
                          Unpaid
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Stripe Invoice */}
              {invoice && (
                <Card>
                  <CardHeader>
                    <CardTitle>Stripe Invoice</CardTitle>
                    <CardDescription>Invoice #{invoice.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="font-medium">Status</div>
                        <div className="mt-1">
                          <Badge className={cn(
                            invoice.status === "paid" && "bg-green-100 text-green-800 hover:bg-green-200",
                            invoice.status === "open" && "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
                            invoice.status === "void" && "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          )}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Customer</div>
                        <div>{invoice.customer_email}</div>
                      </div>
                      <div>
                        <div className="font-medium">Amount Due</div>
                        <div>${invoice.amount_due.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="font-medium">Amount Paid</div>
                        <div>${invoice.amount_paid.toFixed(2)}</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="font-medium">Payment Method</div>
                      <div className="mt-1">{invoice.payment_method}</div>
                    </div>
                    
                    <div>
                      <div className="font-medium">Payment Time</div>
                      <div className="mt-1">{formatDate(invoice.payment_time)}</div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <a href={invoice.hosted_invoice_url} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View on Stripe
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
          
          {/* Payout Breakdowns */}
          <Card>
            <CardHeader>
              <CardTitle>Payout Breakdown</CardTitle>
              <CardDescription>How the payment was distributed</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payee ID</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Paid Time</TableHead>
                    <TableHead>Transfer ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payouts.length > 0 ? (
                    payouts.map((payout) => (
                      <TableRow key={payout.id}>
                        <TableCell>{payout.payee_id}</TableCell>
                        <TableCell>{payout.connected_account_id}</TableCell>
                        <TableCell>${payout.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          {payout.paid ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Paid
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                              <XCircle className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{payout.paid ? formatDate(payout.paid_time) : "-"}</TableCell>
                        <TableCell>{payout.transfer_id}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        No payout records found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              
              <div className="mt-4 flex justify-end">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Payouts
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Reviewer Info */}
            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle>Reviewer Information</CardTitle>
                <CardDescription>Details about the flight reviewer</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <div className="font-medium">Name</div>
                    <div className="text-lg">{order.reviewer_name}</div>
                  </div>
                  
                  <div>
                    <div className="font-medium">Contact</div>
                    <div className="space-y-1 mt-1">
                      <div className="flex items-center">
                        <span className="w-20 text-muted-foreground">Email:</span>
                        <span>{order.reviewer_email}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-muted-foreground">Phone:</span>
                        <span>{order.reviewer_phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="font-medium">Payout Information</div>
                    <div className="space-y-1 mt-1">
                      {payouts.filter(p => p.payee_id.includes('reviewer')).map((payout) => (
                        <div key={payout.id} className="space-y-1">
                          <div className="flex items-center">
                            <span className="w-20 text-muted-foreground">Amount:</span>
                            <span>${payout.amount.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-20 text-muted-foreground">Status:</span>
                            <span>{payout.paid ? "Paid" : "Pending"}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-20 text-muted-foreground">Account:</span>
                            <span>{payout.connected_account_id}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Customer Info */}
            <Card>
              <CardHeader className="bg-purple-50">
                <CardTitle>Customer Information</CardTitle>
                <CardDescription>Details about the person who booked</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <div className="font-medium">Name</div>
                    <div className="text-lg">{order.customer_name}</div>
                  </div>
                  
                  <div>
                    <div className="font-medium">Contact</div>
                    <div className="space-y-1 mt-1">
                      <div className="flex items-center">
                        <span className="w-20 text-muted-foreground">Email:</span>
                        <span>{order.customer_email}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-muted-foreground">Phone:</span>
                        <span>{order.customer_phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="font-medium">MAAC Information</div>
                    <div className="space-y-1 mt-1">
                      <div className="flex items-center">
                        <span className="w-20 text-muted-foreground">Member:</span>
                        <span>{order.maac_member_flag ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-muted-foreground">Discount:</span>
                        <span>{order.maac_member_discount_flag ? "Applied" : "Not Applied"}</span>
                      </div>
                    </div>
                  </div>
                  
                  {payment && (
                    <>
                      <Separator />
                      
                      <div>
                        <div className="font-medium">Payment Information</div>
                        <div className="space-y-1 mt-1">
                          <div className="flex items-center">
                            <span className="w-20 text-muted-foreground">Payer ID:</span>
                            <span>{payment.payer_id}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-20 text-muted-foreground">Type:</span>
                            <span className="capitalize">{payment.payment_type.replace("_", " ")}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-20 text-muted-foreground">Total:</span>
                            <span>${payment.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderDetail;
