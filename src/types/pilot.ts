
export interface Pilot {
  id: string;
  firstname: string;
  lastname: string;
  license: string;
  phone: string;
  email: string;
  licenseFile?: string;
  pilot: boolean;
  observer: boolean;
  payloadOperator: boolean;
  superuser: boolean;
  user_id: string;
  create_time: string;
  update_time: string;
}

// Mock data for pilots
export const mockPilots: Pilot[] = [
  {
    id: '1',
    firstname: 'John',
    lastname: 'Smith',
    license: 'RPAS-12345',
    phone: '555-123-4567',
    email: 'john.smith@example.com',
    licenseFile: 'license1.pdf',
    pilot: true,
    observer: false,
    payloadOperator: true,
    superuser: false,
    user_id: '1',
    create_time: '2024-02-10T09:30:00Z',
    update_time: '2024-02-10T09:30:00Z'
  },
  {
    id: '2',
    firstname: 'Emily',
    lastname: 'Johnson',
    license: 'RPAS-67890',
    phone: '555-234-5678',
    email: 'emily.johnson@example.com',
    licenseFile: 'license2.pdf',
    pilot: true,
    observer: true,
    payloadOperator: true,
    superuser: true,
    user_id: '1',
    create_time: '2024-01-15T14:45:00Z',
    update_time: '2024-03-05T11:20:00Z'
  },
  {
    id: '3',
    firstname: 'Michael',
    lastname: 'Williams',
    license: 'RPAS-24680',
    phone: '555-345-6789',
    email: 'michael.williams@example.com',
    licenseFile: 'license3.pdf',
    pilot: true,
    observer: false,
    payloadOperator: false,
    superuser: false,
    user_id: '2',
    create_time: '2024-03-01T10:15:00Z',
    update_time: '2024-03-01T10:15:00Z'
  },
  {
    id: '4',
    firstname: 'Sophia',
    lastname: 'Brown',
    license: 'RPAS-13579',
    phone: '555-456-7890',
    email: 'sophia.brown@example.com',
    licenseFile: 'license4.pdf',
    pilot: false,
    observer: true,
    payloadOperator: true,
    superuser: false,
    user_id: '3',
    create_time: '2023-12-20T13:10:00Z',
    update_time: '2024-02-25T09:45:00Z'
  },
  {
    id: '5',
    firstname: 'Daniel',
    lastname: 'Jones',
    license: 'RPAS-97531',
    phone: '555-567-8901',
    email: 'daniel.jones@example.com',
    licenseFile: 'license5.pdf',
    pilot: true,
    observer: true,
    payloadOperator: false,
    superuser: true,
    user_id: '4',
    create_time: '2024-02-05T16:30:00Z',
    update_time: '2024-03-10T12:15:00Z'
  },
  {
    id: '6',
    firstname: 'Olivia',
    lastname: 'Davis',
    license: 'RPAS-36925',
    phone: '555-678-9012',
    email: 'olivia.davis@example.com',
    licenseFile: 'license6.pdf',
    pilot: true,
    observer: false,
    payloadOperator: true,
    superuser: false,
    user_id: '1',
    create_time: '2024-02-15T12:40:00Z',
    update_time: '2024-02-15T12:40:00Z'
  },
  {
    id: '7',
    firstname: 'William',
    lastname: 'Miller',
    license: 'RPAS-85274',
    phone: '555-789-0123',
    email: 'william.miller@example.com',
    licenseFile: 'license7.pdf',
    pilot: true,
    observer: true,
    payloadOperator: true,
    superuser: false,
    user_id: '2',
    create_time: '2024-03-02T11:25:00Z',
    update_time: '2024-03-12T15:10:00Z'
  },
  {
    id: '8',
    firstname: 'Ava',
    lastname: 'Wilson',
    license: 'RPAS-74185',
    phone: '555-890-1234',
    email: 'ava.wilson@example.com',
    licenseFile: 'license8.pdf',
    pilot: false,
    observer: false,
    payloadOperator: true,
    superuser: true,
    user_id: '3',
    create_time: '2024-01-28T10:50:00Z',
    update_time: '2024-01-28T10:50:00Z'
  },
  {
    id: '9',
    firstname: 'James',
    lastname: 'Taylor',
    license: 'RPAS-95123',
    phone: '555-901-2345',
    email: 'james.taylor@example.com',
    licenseFile: 'license9.pdf',
    pilot: true,
    observer: true,
    payloadOperator: false,
    superuser: false,
    user_id: '4',
    create_time: '2024-02-22T14:15:00Z',
    update_time: '2024-03-15T09:35:00Z'
  },
  {
    id: '10',
    firstname: 'Isabella',
    lastname: 'Anderson',
    license: 'RPAS-62357',
    phone: '555-012-3456',
    email: 'isabella.anderson@example.com',
    licenseFile: 'license10.pdf',
    pilot: true,
    observer: false,
    payloadOperator: true,
    superuser: true,
    user_id: '1',
    create_time: '2024-01-10T15:35:00Z',
    update_time: '2024-03-08T13:20:00Z'
  }
];
