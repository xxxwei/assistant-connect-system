
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
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import BadgeManagement from "./pages/BadgeManagement";
import BadgeCreate from "./pages/BadgeCreate";
import BadgeEdit from "./pages/BadgeEdit";
import BadgeDetails from "./pages/BadgeDetails";
import BadgeDistribute from "./pages/BadgeDistribute";
import FormMenu from "./pages/FormMenu";
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
