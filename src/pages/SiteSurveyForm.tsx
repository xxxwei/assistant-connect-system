
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, Save, FileUp, Trash2 } from "lucide-react";
import { SiteSurvey, surveyTypes } from "@/types/siteSurvey";
import { mockSiteSurveys } from "@/data/mockSiteSurveys";

const formSchema = z.object({
  // Basic survey info
  title: z.string().min(1, "Title is required"),
  mission_reference_no: z.string().min(1, "Mission reference number is required"),
  
  // User Info
  user_id: z.string().min(1, "User ID is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  adminEmail: z.string().email("Invalid admin email").optional(),
  usertype: z.string().optional(),
  locale: z.string().optional(),
  mobile: z.string().optional(),
  address: z.string().optional(),
  
  // Mission Info
  startLocal: z.date(),
  endLocal: z.date(),
  survey_type: z.string().min(1, "Survey type is required"),
  order_id: z.string().optional(),
  flight_school: z.string().optional(),
  
  // Customer Info
  customer_name: z.string().optional(),
  customer_email: z.string().email("Invalid customer email").optional(),
  customer_phone: z.string().optional(),
  
  // Drone Info
  drone_id: z.string().min(1, "Drone ID is required"),
  dronecolor: z.string().optional(),
  droneregistrationnumber: z.string().optional(),
  manufacturer: z.string().optional(),
  rpas: z.string().optional(),
  serialno: z.string().optional(),
  
  // Pilot Info
  pilotname: z.string().min(1, "Pilot name is required"),
  pilot_id: z.string().optional(),
  pilotphone: z.string().optional(),
  pilotlicense: z.string().optional(),
  
  // Observer Info
  observername: z.string().optional(),
  payloadoperatorname: z.string().optional(),
  
  // Location Info
  latitude: z.number(),
  longitude: z.number(),
  operationradius: z.number().optional(),
  radiusunit: z.string().optional(),
  operationaltitude: z.number().optional(),
  fir: z.string().optional(),
  air_status: z.string().optional(),
  controlled: z.boolean().default(false),
  nearestAerodromes: z.string().optional(),
  markers: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SiteSurveyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mapImg, setMapImg] = useState<string | null>(null);
  const isEditMode = !!id;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      mission_reference_no: "",
      user_id: "",
      email: "",
      startLocal: new Date(),
      endLocal: new Date(),
      survey_type: "",
      drone_id: "",
      pilotname: "",
      latitude: 0,
      longitude: 0,
      controlled: false,
    },
  });

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      // In a real app, fetch from API
      setTimeout(() => {
        const survey = mockSiteSurveys.find(s => s.id === id);
        if (survey) {
          form.reset({
            title: survey.title,
            mission_reference_no: survey.mission_reference_no,
            user_id: survey.user_id,
            email: survey.email,
            phone: survey.phone,
            adminEmail: survey.adminEmail,
            usertype: survey.usertype,
            locale: survey.locale,
            mobile: survey.mobile,
            address: survey.address,
            startLocal: new Date(survey.startLocal),
            endLocal: new Date(survey.endLocal),
            survey_type: survey.survey_type,
            order_id: survey.order_id,
            flight_school: survey.flight_school,
            customer_name: survey.customer_name,
            customer_email: survey.customer_email,
            customer_phone: survey.customer_phone,
            drone_id: survey.drone_id,
            dronecolor: survey.dronecolor,
            droneregistrationnumber: survey.droneregistrationnumber,
            manufacturer: survey.manufacturer,
            rpas: survey.rpas,
            serialno: survey.serialno,
            pilotname: survey.pilotname,
            pilot_id: survey.pilot_id,
            pilotphone: survey.pilotphone,
            pilotlicense: survey.pilotlicense,
            observername: survey.observername,
            payloadoperatorname: survey.payloadoperatorname,
            latitude: survey.latitude,
            longitude: survey.longitude,
            operationradius: survey.operationradius,
            radiusunit: survey.radiusunit,
            operationaltitude: survey.operationaltitude,
            fir: survey.fir,
            air_status: survey.air_status,
            controlled: survey.controlled,
            nearestAerodromes: survey.nearestAerodromes,
            markers: survey.markers,
          });
          
          setMapImg(survey.map_img || null);
        }
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, [id, isEditMode]);

  const onSubmit = (data: FormValues) => {
    // In a real app, send to API
    console.log("Form data:", data);
    console.log("Map image:", mapImg);
    
    // Mock success and redirect
    setTimeout(() => {
      navigate(`/site-surveys${isEditMode ? `/${id}` : ''}`);
    }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, upload to server
      const reader = new FileReader();
      reader.onload = (event) => {
        setMapImg(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setMapImg(null);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <p>Loading survey form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="outline" size="sm" className="mr-4" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-light">{isEditMode ? 'Edit Site Survey' : 'Create Site Survey'}</h1>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="basic">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="user">User Info</TabsTrigger>
              <TabsTrigger value="mission">Mission</TabsTrigger>
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="drone">Drone & Pilot</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Survey Title*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter survey title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mission_reference_no"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mission Reference Number*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., MSN-1234" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="survey_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Survey Type*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select survey type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {surveyTypes.map((type) => (
                              <SelectItem key={type} value={type} className="capitalize">
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="controlled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 space-y-0 pt-6">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Controlled Airspace</FormLabel>
                          <FormDescription>
                            Check if this survey is in controlled airspace
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startLocal"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date & Time*</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP HH:mm") : <span>Pick a date</span>}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endLocal"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date & Time*</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP HH:mm") : <span>Pick a date</span>}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="user" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="user_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User ID*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter user ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="adminEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admin Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter admin email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="usertype"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User Type</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter user type" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="locale"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Locale</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., en-US" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter mobile number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="mission" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="order_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter order ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="flight_school"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Flight School</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter flight school" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="customer" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="customer_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter customer name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customer_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter customer email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customer_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter customer phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="drone" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="drone_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Drone ID*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter drone ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="manufacturer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Manufacturer</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter manufacturer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="dronecolor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Drone Color</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter drone color" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="droneregistrationnumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter registration number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serialno"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serial Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter serial number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="rpas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RPAS</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter RPAS information" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <hr className="my-4" />
                
                <h3 className="text-lg font-medium">Pilot Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="pilotname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pilot Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter pilot name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pilot_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pilot ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter pilot ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="pilotphone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pilot Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter pilot phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pilotlicense"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pilot License</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter pilot license" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <hr className="my-4" />
                
                <h3 className="text-lg font-medium">Observer Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="observername"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observer Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter observer name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="payloadoperatorname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payload Operator Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter payload operator name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude*</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.000001"
                            placeholder="Enter latitude"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude*</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.000001"
                            placeholder="Enter longitude"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="operationradius"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Operation Radius</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter radius"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value === "" ? undefined : parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="radiusunit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Radius Unit</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value || "m"}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="m">Meters</SelectItem>
                            <SelectItem value="km">Kilometers</SelectItem>
                            <SelectItem value="ft">Feet</SelectItem>
                            <SelectItem value="mi">Miles</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="operationaltitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Operation Altitude (m)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter altitude"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value === "" ? undefined : parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="fir"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>FIR</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter FIR" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="air_status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Air Status</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter air status" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nearestAerodromes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nearest Aerodromes</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter nearest aerodromes" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Map Image</h3>
                  <div className="border rounded-lg p-4">
                    {mapImg ? (
                      <div className="relative">
                        <img 
                          src={mapImg} 
                          alt="Map" 
                          className="w-full h-auto max-h-[300px] object-contain rounded" 
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={handleRemoveImage}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <FileUp className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-gray-500 mb-4">Upload a map image</p>
                        <Button type="button" variant="outline" className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleImageUpload}
                          />
                          Choose File
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Map Preview</h3>
                  <div className="border rounded-lg p-4 bg-gray-50 h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-gray-500">Map will be displayed here</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Latitude: {form.watch("latitude")}, Longitude: {form.watch("longitude")}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
            
            <div className="flex justify-end">
              <Button type="button" variant="outline" className="mr-2" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                {isEditMode ? 'Update Survey' : 'Create Survey'}
              </Button>
            </div>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};

export default SiteSurveyForm;
