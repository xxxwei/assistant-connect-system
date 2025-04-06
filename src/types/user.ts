
// User type definitions
export interface User {
  id: string;
  firstname: string;
  lastname: string;
  name?: string; // For backward compatibility
  email: string;
  phone?: string;
  type: 'admin' | 'supervisor' | 'agent' | 'flight_reviewer' | 'basic_user';
  status: 'active' | 'inactive';
  street?: string;
  city?: string;
  province?: string;
  postalcode?: string;
  locale?: string;
  registered_on: string;
  loggedOn?: string;
  card_brand?: string;
  card_last4?: string;
  plan_type?: string;
  plan_freq?: string;
  maac_member: boolean;
  cancelled?: boolean;
  stripe_user_id?: string;
  activated: boolean;
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

export const activationOptions = [
  { value: 'all', label: 'All' },
  { value: 'true', label: 'Activated' },
  { value: 'false', label: 'Not Activated' },
];

export const maacOptions = [
  { value: 'all', label: 'All' },
  { value: 'true', label: 'MAAC Member' },
  { value: 'false', label: 'Not MAAC Member' },
];

// Mock data for users with updated fields
export const mockUsers: User[] = [
  { 
    id: '1', 
    firstname: 'John', 
    lastname: 'Doe', 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    phone: '(555) 123-4567',
    type: 'admin', 
    status: 'active',
    street: '123 Admin Street',
    city: 'Toronto',
    province: 'ON',
    postalcode: 'M5V 2T6',
    locale: 'en',
    registered_on: '2023-05-15T10:30:00Z',
    loggedOn: '2024-04-05T14:22:30Z',
    card_brand: 'Visa',
    card_last4: '4242',
    plan_type: 'premium',
    plan_freq: 'annual',
    maac_member: true,
    cancelled: false,
    activated: true
  },
  { 
    id: '2', 
    firstname: 'Jane', 
    lastname: 'Smith', 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    phone: '(555) 234-5678',
    type: 'agent', 
    status: 'active',
    street: '456 Agent Drive',
    city: 'Vancouver',
    province: 'BC',
    postalcode: 'V6B 5E1',
    locale: 'en',
    registered_on: '2023-06-20T09:15:00Z',
    loggedOn: '2024-04-04T11:45:12Z',
    card_brand: 'Mastercard',
    card_last4: '5555',
    plan_type: 'standard',
    plan_freq: 'monthly',
    maac_member: false,
    activated: true
  },
  { 
    id: '3', 
    firstname: 'Robert', 
    lastname: 'Johnson', 
    name: 'Robert Johnson', 
    email: 'robert.j@example.com', 
    phone: '(555) 345-6789',
    type: 'agent', 
    status: 'inactive',
    registered_on: '2023-07-10T14:20:00Z',
    maac_member: false,
    activated: false
  },
  { 
    id: '4', 
    firstname: 'Emily', 
    lastname: 'Williams', 
    name: 'Emily Williams', 
    email: 'emily.w@example.com', 
    phone: '(555) 456-7890',
    type: 'agent', 
    status: 'active',
    registered_on: '2023-08-05T16:40:00Z',
    maac_member: true,
    activated: true
  },
  { 
    id: '5', 
    firstname: 'Michael', 
    lastname: 'Brown', 
    name: 'Michael Brown', 
    email: 'michael.b@example.com', 
    phone: '(555) 567-8901',
    type: 'flight_reviewer', 
    status: 'active',
    street: '789 Review Lane',
    city: 'Calgary',
    province: 'AB',
    postalcode: 'T2P 2M5',
    locale: 'en',
    registered_on: '2023-06-15T08:30:00Z',
    loggedOn: '2024-04-03T09:12:45Z',
    maac_member: true,
    activated: true
  },
  { 
    id: '6', 
    firstname: 'Sarah', 
    lastname: 'Davis', 
    name: 'Sarah Davis', 
    email: 'sarah.d@example.com', 
    phone: '(555) 678-9012',
    type: 'basic_user', 
    status: 'active',
    registered_on: '2023-09-12T11:25:00Z',
    maac_member: false,
    activated: true
  },
  { 
    id: '7', 
    firstname: 'David', 
    lastname: 'Miller', 
    name: 'David Miller', 
    email: 'david.m@example.com', 
    phone: '(555) 789-0123',
    type: 'basic_user', 
    status: 'inactive',
    registered_on: '2023-10-08T13:50:00Z',
    maac_member: true,
    activated: false
  },
  { 
    id: '8', 
    firstname: 'Lisa', 
    lastname: 'Wilson', 
    name: 'Lisa Wilson', 
    email: 'lisa.w@example.com', 
    phone: '(555) 890-1234',
    type: 'flight_reviewer', 
    status: 'active',
    street: '321 Drone Avenue',
    city: 'Ottawa',
    province: 'ON',
    postalcode: 'K1P 5M7',
    locale: 'fr',
    registered_on: '2023-07-25T15:15:00Z',
    loggedOn: '2024-04-01T16:34:22Z',
    maac_member: true,
    activated: true
  },
  { 
    id: '9', 
    firstname: 'Thomas', 
    lastname: 'Moore', 
    name: 'Thomas Moore', 
    email: 'thomas.m@example.com', 
    phone: '(555) 901-2345',
    type: 'basic_user', 
    status: 'active',
    registered_on: '2023-11-20T09:40:00Z',
    maac_member: false,
    activated: true
  },
  { 
    id: '10', 
    firstname: 'Jennifer', 
    lastname: 'Taylor', 
    name: 'Jennifer Taylor', 
    email: 'jennifer.t@example.com', 
    phone: '(555) 012-3456',
    type: 'basic_user', 
    status: 'active',
    registered_on: '2023-12-15T10:30:00Z',
    maac_member: false,
    activated: true
  },
  { 
    id: '11', 
    firstname: 'Daniel', 
    lastname: 'Anderson', 
    name: 'Daniel Anderson', 
    email: 'daniel.a@example.com', 
    phone: '(555) 123-4567',
    type: 'basic_user', 
    status: 'inactive',
    registered_on: '2024-01-10T14:20:00Z',
    maac_member: true,
    activated: false
  },
  { 
    id: '12', 
    firstname: 'Jessica', 
    lastname: 'Thomas', 
    name: 'Jessica Thomas', 
    email: 'jessica.t@example.com', 
    phone: '(555) 234-5678',
    type: 'supervisor', 
    status: 'active',
    registered_on: '2023-08-30T11:45:00Z',
    maac_member: false,
    activated: true
  },
  { 
    id: '13', 
    firstname: 'Ryan', 
    lastname: 'Jackson', 
    name: 'Ryan Jackson', 
    email: 'ryan.j@example.com', 
    phone: '(555) 345-6789',
    type: 'basic_user', 
    status: 'active',
    registered_on: '2023-09-25T13:10:00Z',
    maac_member: true,
    activated: true
  },
  { 
    id: '14', 
    firstname: 'Olivia', 
    lastname: 'White', 
    name: 'Olivia White', 
    email: 'olivia.w@example.com', 
    phone: '(555) 456-7890',
    type: 'basic_user', 
    status: 'active',
    registered_on: '2023-10-12T15:30:00Z',
    maac_member: false,
    activated: true
  },
  { 
    id: '15', 
    firstname: 'Kevin', 
    lastname: 'Harris', 
    name: 'Kevin Harris', 
    email: 'kevin.h@example.com', 
    phone: '(555) 567-8901',
    type: 'admin', 
    status: 'inactive',
    registered_on: '2023-11-08T09:20:00Z',
    maac_member: true,
    activated: false
  },
  { 
    id: '16', 
    firstname: 'Amanda', 
    lastname: 'Martinez', 
    name: 'Amanda Martinez', 
    email: 'amanda.m@example.com', 
    phone: '(555) 678-9012',
    type: 'basic_user', 
    status: 'active',
    registered_on: '2023-12-05T14:45:00Z',
    maac_member: false,
    activated: true
  },
  { 
    id: '17', 
    firstname: 'Brian', 
    lastname: 'Robinson', 
    name: 'Brian Robinson', 
    email: 'brian.r@example.com', 
    phone: '(555) 789-0123',
    type: 'basic_user', 
    status: 'active',
    registered_on: '2024-01-20T10:15:00Z',
    maac_member: true,
    activated: true
  },
  { 
    id: '18', 
    firstname: 'Stephanie', 
    lastname: 'Clark', 
    name: 'Stephanie Clark', 
    email: 'stephanie.c@example.com', 
    phone: '(555) 890-1234',
    type: 'supervisor', 
    status: 'inactive',
    registered_on: '2023-07-15T13:40:00Z',
    maac_member: false,
    activated: false
  },
  { 
    id: '19', 
    firstname: 'Matthew', 
    lastname: 'Rodriguez', 
    name: 'Matthew Rodriguez', 
    email: 'matthew.r@example.com', 
    phone: '(555) 901-2345',
    type: 'basic_user', 
    status: 'active',
    registered_on: '2023-08-22T11:30:00Z',
    maac_member: true,
    activated: true
  },
  { 
    id: '20', 
    firstname: 'Laura', 
    lastname: 'Lewis', 
    name: 'Laura Lewis', 
    email: 'laura.l@example.com', 
    phone: '(555) 012-3456',
    type: 'basic_user', 
    status: 'active',
    registered_on: '2023-09-18T15:10:00Z',
    maac_member: false,
    activated: true
  },
];

export const formatDate = (dateString: string, includeTime: boolean = false): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
  };
  
  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return date.toLocaleDateString('en-US', options);
};
