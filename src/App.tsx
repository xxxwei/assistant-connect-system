
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from 'antd';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/UserList";
import UserDetails from "./pages/UserDetails";
import UserProfile from "./pages/UserProfile";
import OrderList from "./pages/OrderList";
import OrderDetail from "./pages/OrderDetail";
import OrderReports from "./pages/OrderReports";
import SiteSurveyManagement from "./pages/SiteSurveyManagement";
import SiteSurveyDetail from "./pages/SiteSurveyDetail";
import SiteSurveyForm from "./pages/SiteSurveyForm";
import DroneManagement from "./pages/DroneManagement";
import PilotManagement from "./pages/PilotManagement";
import ReviewPackageManagement from "./pages/ReviewPackageManagement";
import ReviewAddressManagement from "./pages/ReviewAddressManagement";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import BadgeManagement from "./pages/BadgeManagement";
import BadgeCreate from "./pages/BadgeCreate";
import BadgeEdit from "./pages/BadgeEdit";
import BadgeDetails from "./pages/BadgeDetails";
import BadgeDistribute from "./pages/BadgeDistribute";
import FormMenu from "./pages/FormMenu";
import ConfigParamManagement from "./pages/ConfigParamManagement";
import BusinessLineManagement from "./pages/BusinessLineManagement";
import { checkAuth } from "./services/authService";

const queryClient = new QueryClient();

const theme = {
  token: {
    colorPrimary: '#0070f3',
    borderRadius: 8,
    fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", sans-serif',
  },
};

const App = () => {
  const isAuthenticated = checkAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={theme}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route 
                path="/" 
                element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
              />
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes with MainLayout */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* User routes */}
              <Route path="/users" element={
                <ProtectedRoute>
                  <MainLayout>
                    <UserList />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/users/:id" element={
                <ProtectedRoute>
                  <MainLayout>
                    <UserDetails />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/profile/:id" element={
                <ProtectedRoute>
                  <MainLayout>
                    <UserProfile />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Drone routes */}
              <Route path="/drones" element={
                <ProtectedRoute>
                  <MainLayout>
                    <DroneManagement />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Pilot routes */}
              <Route path="/pilots" element={
                <ProtectedRoute>
                  <MainLayout>
                    <PilotManagement />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Review Package routes */}
              <Route path="/review-packages" element={
                <ProtectedRoute>
                  <MainLayout>
                    <ReviewPackageManagement />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Review Address routes */}
              <Route path="/review-addresses" element={
                <ProtectedRoute>
                  <MainLayout>
                    <ReviewAddressManagement />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Order routes */}
              <Route path="/orders" element={
                <ProtectedRoute>
                  <MainLayout>
                    <OrderList />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/orders/:id" element={
                <ProtectedRoute>
                  <MainLayout>
                    <OrderDetail />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/orders/reports" element={
                <ProtectedRoute>
                  <MainLayout>
                    <OrderReports />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Site Survey routes */}
              <Route path="/site-surveys" element={
                <ProtectedRoute>
                  <MainLayout>
                    <SiteSurveyManagement />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/site-surveys/:id" element={
                <ProtectedRoute>
                  <MainLayout>
                    <SiteSurveyDetail />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/site-surveys/create" element={
                <ProtectedRoute>
                  <MainLayout>
                    <SiteSurveyForm />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/site-surveys/:id/edit" element={
                <ProtectedRoute>
                  <MainLayout>
                    <SiteSurveyForm />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Badge Management routes */}
              <Route path="/badges" element={
                <ProtectedRoute>
                  <MainLayout>
                    <BadgeManagement />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/badges/create" element={
                <ProtectedRoute>
                  <MainLayout>
                    <BadgeCreate />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/badges/edit/:id" element={
                <ProtectedRoute>
                  <MainLayout>
                    <BadgeEdit />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/badges/details/:id" element={
                <ProtectedRoute>
                  <MainLayout>
                    <BadgeDetails />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/badges/distribute/:id" element={
                <ProtectedRoute>
                  <MainLayout>
                    <BadgeDistribute />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/badges/form-menu" element={
                <ProtectedRoute>
                  <MainLayout>
                    <FormMenu />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Configuration Management routes */}
              <Route path="/config/parameters" element={
                <ProtectedRoute>
                  <MainLayout>
                    <ConfigParamManagement />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/config/business-lines" element={
                <ProtectedRoute>
                  <MainLayout>
                    <BusinessLineManagement />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/tickets" element={
                <ProtectedRoute>
                  <MainLayout>
                    <div className="p-6">
                      <h1 className="text-2xl font-light mb-4">Tickets Management</h1>
                      <p>Ticket management functionality would go here.</p>
                    </div>
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/customers" element={
                <ProtectedRoute>
                  <MainLayout>
                    <div className="p-6">
                      <h1 className="text-2xl font-light mb-4">Customers Management</h1>
                      <p>Customer management functionality would go here.</p>
                    </div>
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
