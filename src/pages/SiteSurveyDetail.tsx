
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { SiteSurvey } from "@/types/siteSurvey";
import { 
  FileText, ChevronLeft, MapPin, User, Plane, 
  Edit, Download, Mail, Calendar, Phone,
  Map as MapIcon
} from "lucide-react";
import { mockSiteSurveys } from "@/data/mockSiteSurveys";

const SiteSurveyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<SiteSurvey | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch from API
    setLoading(true);
    setTimeout(() => {
      const foundSurvey = mockSiteSurveys.find(s => s.id === id);
      setSurvey(foundSurvey || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleGeneratePDF = () => {
    // In a real implementation, this would generate a PDF and offer it for download
    alert(`Generating PDF report for survey ${id} and sending to ${survey?.email}, ${survey?.customer_email}, and ${survey?.adminEmail}`);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <p>Loading survey details...</p>
        </div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="p-6">
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-lg mb-4">Survey not found</p>
          <Button onClick={() => navigate('/site-surveys')}>
            Return to Survey List
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="outline" size="sm" className="mr-4" onClick={() => navigate('/site-surveys')}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
          <h1 className="text-2xl font-light">{survey.title}</h1>
          <Badge className="ml-4 capitalize">{survey.survey_type}</Badge>
          <Badge variant={survey.controlled ? "default" : "outline"} className="ml-2">
            {survey.controlled ? 'Controlled Airspace' : 'Uncontrolled Airspace'}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleGeneratePDF}>
            <FileText className="mr-2 h-4 w-4" />
            Generate PDF Report
          </Button>
          <Link to={`/site-surveys/${id}/edit`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit Survey
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              User Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="font-medium">User ID:</dt>
                <dd>{survey.user_id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Email:</dt>
                <dd className="truncate max-w-[200px]">{survey.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Phone:</dt>
                <dd>{survey.phone || 'N/A'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Admin Email:</dt>
                <dd className="truncate max-w-[200px]">{survey.adminEmail || 'N/A'}</dd>
              </div>
              {survey.usertype && (
                <div className="flex justify-between">
                  <dt className="font-medium">User Type:</dt>
                  <dd>{survey.usertype}</dd>
                </div>
              )}
              {survey.address && (
                <div className="flex justify-between">
                  <dt className="font-medium">Address:</dt>
                  <dd className="truncate max-w-[200px]">{survey.address}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Mission Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="font-medium">Mission Ref:</dt>
                <dd>{survey.mission_reference_no}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Start Date:</dt>
                <dd>{format(new Date(survey.startLocal), 'MMM dd, yyyy HH:mm')}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">End Date:</dt>
                <dd>{format(new Date(survey.endLocal), 'MMM dd, yyyy HH:mm')}</dd>
              </div>
              {survey.order_id && (
                <div className="flex justify-between">
                  <dt className="font-medium">Order ID:</dt>
                  <dd>{survey.order_id}</dd>
                </div>
              )}
              {survey.flight_school && (
                <div className="flex justify-between">
                  <dt className="font-medium">Flight School:</dt>
                  <dd>{survey.flight_school}</dd>
                </div>
              )}
              {survey.create_time && (
                <div className="flex justify-between">
                  <dt className="font-medium">Created:</dt>
                  <dd>{format(new Date(survey.create_time), 'MMM dd, yyyy')}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="mr-2 h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="font-medium">Name:</dt>
                <dd>{survey.customer_name || 'N/A'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Email:</dt>
                <dd className="truncate max-w-[200px]">{survey.customer_email || 'N/A'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Phone:</dt>
                <dd>{survey.customer_phone || 'N/A'}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plane className="mr-2 h-5 w-5" />
              Drone Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="font-medium">Drone ID:</dt>
                <dd>{survey.drone_id}</dd>
              </div>
              {survey.dronecolor && (
                <div className="flex justify-between">
                  <dt className="font-medium">Color:</dt>
                  <dd>{survey.dronecolor}</dd>
                </div>
              )}
              {survey.droneregistrationnumber && (
                <div className="flex justify-between">
                  <dt className="font-medium">Registration Number:</dt>
                  <dd>{survey.droneregistrationnumber}</dd>
                </div>
              )}
              {survey.manufacturer && (
                <div className="flex justify-between">
                  <dt className="font-medium">Manufacturer:</dt>
                  <dd>{survey.manufacturer}</dd>
                </div>
              )}
              {survey.rpas && (
                <div className="flex justify-between">
                  <dt className="font-medium">RPAS:</dt>
                  <dd>{survey.rpas}</dd>
                </div>
              )}
              {survey.serialno && (
                <div className="flex justify-between">
                  <dt className="font-medium">Serial Number:</dt>
                  <dd>{survey.serialno}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Pilot Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="font-medium">Pilot Name:</dt>
                <dd>{survey.pilotname}</dd>
              </div>
              {survey.pilot_id && (
                <div className="flex justify-between">
                  <dt className="font-medium">Pilot ID:</dt>
                  <dd>{survey.pilot_id}</dd>
                </div>
              )}
              {survey.pilotphone && (
                <div className="flex justify-between">
                  <dt className="font-medium">Pilot Phone:</dt>
                  <dd>{survey.pilotphone}</dd>
                </div>
              )}
              {survey.pilotlicense && (
                <div className="flex justify-between">
                  <dt className="font-medium">License:</dt>
                  <dd>{survey.pilotlicense}</dd>
                </div>
              )}
              {survey.observername && (
                <div className="flex justify-between">
                  <dt className="font-medium">Observer:</dt>
                  <dd>{survey.observername}</dd>
                </div>
              )}
              {survey.payloadoperatorname && (
                <div className="flex justify-between">
                  <dt className="font-medium">Payload Operator:</dt>
                  <dd>{survey.payloadoperatorname}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Location Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-medium">Latitude:</dt>
                    <dd>{survey.latitude}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Longitude:</dt>
                    <dd>{survey.longitude}</dd>
                  </div>
                  {survey.operationradius && (
                    <div className="flex justify-between">
                      <dt className="font-medium">Operation Radius:</dt>
                      <dd>{survey.operationradius} {survey.radiusunit || 'm'}</dd>
                    </div>
                  )}
                  {survey.operationaltitude && (
                    <div className="flex justify-between">
                      <dt className="font-medium">Operation Altitude:</dt>
                      <dd>{survey.operationaltitude} m</dd>
                    </div>
                  )}
                  {survey.fir && (
                    <div className="flex justify-between">
                      <dt className="font-medium">FIR:</dt>
                      <dd>{survey.fir}</dd>
                    </div>
                  )}
                  {survey.air_status && (
                    <div className="flex justify-between">
                      <dt className="font-medium">Air Status:</dt>
                      <dd>{survey.air_status}</dd>
                    </div>
                  )}
                  {survey.nearestAerodromes && (
                    <div className="flex justify-between">
                      <dt className="font-medium">Nearest Aerodromes:</dt>
                      <dd>{survey.nearestAerodromes}</dd>
                    </div>
                  )}
                </dl>
              </div>
              <div className="bg-gray-100 rounded-lg p-2 flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                  <MapIcon className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Map will be displayed here</p>
                  <p className="mt-1 text-xs text-gray-400">Latitude: {survey.latitude}, Longitude: {survey.longitude}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Site Photos</CardTitle>
          <CardDescription>
            Uploaded images and maps for this site survey
          </CardDescription>
        </CardHeader>
        <CardContent>
          {survey.map_img ? (
            <div className="border rounded-lg overflow-hidden">
              <img 
                src={survey.map_img} 
                alt="Site Map" 
                className="w-full h-auto max-h-[400px] object-contain" 
              />
            </div>
          ) : (
            <div className="border rounded-lg p-12 flex flex-col items-center justify-center bg-gray-50">
              <FileText className="h-12 w-12 text-gray-300 mb-2" />
              <p className="text-gray-500">No images have been uploaded for this survey</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSurveyDetail;
