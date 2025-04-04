
// User type definitions
export interface User {
  id: string;
  name: string;
  email: string;
  type: 'admin' | 'supervisor' | 'agent' | 'flight_reviewer' | 'basic_user';
  status: 'active' | 'inactive';
}

export const userTypeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'admin', label: 'Admin' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'agent', label: 'Agent' },
  { value: 'flight_reviewer', label: 'Flight Reviewer' },
  { value: 'basic_user', label: 'Basic User' },
];

export const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

// Mock data for users
export const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', type: 'admin', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', type: 'agent', status: 'active' },
  { id: '3', name: 'Robert Johnson', email: 'robert.j@example.com', type: 'agent', status: 'inactive' },
  { id: '4', name: 'Emily Williams', email: 'emily.w@example.com', type: 'agent', status: 'active' },
  { id: '5', name: 'Michael Brown', email: 'michael.b@example.com', type: 'flight_reviewer', status: 'active' },
  { id: '6', name: 'Sarah Davis', email: 'sarah.d@example.com', type: 'basic_user', status: 'active' },
  { id: '7', name: 'David Miller', email: 'david.m@example.com', type: 'basic_user', status: 'inactive' },
  { id: '8', name: 'Lisa Wilson', email: 'lisa.w@example.com', type: 'flight_reviewer', status: 'active' },
  { id: '9', name: 'Thomas Moore', email: 'thomas.m@example.com', type: 'basic_user', status: 'active' },
  { id: '10', name: 'Jennifer Taylor', email: 'jennifer.t@example.com', type: 'basic_user', status: 'active' },
  { id: '11', name: 'Daniel Anderson', email: 'daniel.a@example.com', type: 'basic_user', status: 'inactive' },
  { id: '12', name: 'Jessica Thomas', email: 'jessica.t@example.com', type: 'supervisor', status: 'active' },
  { id: '13', name: 'Ryan Jackson', email: 'ryan.j@example.com', type: 'basic_user', status: 'active' },
  { id: '14', name: 'Olivia White', email: 'olivia.w@example.com', type: 'basic_user', status: 'active' },
  { id: '15', name: 'Kevin Harris', email: 'kevin.h@example.com', type: 'admin', status: 'inactive' },
  { id: '16', name: 'Amanda Martinez', email: 'amanda.m@example.com', type: 'basic_user', status: 'active' },
  { id: '17', name: 'Brian Robinson', email: 'brian.r@example.com', type: 'basic_user', status: 'active' },
  { id: '18', name: 'Stephanie Clark', email: 'stephanie.c@example.com', type: 'supervisor', status: 'inactive' },
  { id: '19', name: 'Matthew Rodriguez', email: 'matthew.r@example.com', type: 'basic_user', status: 'active' },
  { id: '20', name: 'Laura Lewis', email: 'laura.l@example.com', type: 'basic_user', status: 'active' },
];
