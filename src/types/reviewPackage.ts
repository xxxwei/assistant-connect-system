
export interface ReviewPackage {
  id: string;
  title: string;
  description: string;
  price: number;
  package_type: 'standard' | 'premium' | 'custom';
  enabled: boolean;
  reviewer_id: string;
  create_time: string;
  update_time: string;
}

export const packageTypes = ['standard', 'premium', 'custom'];

// Mock data for review packages
export const mockReviewPackages: ReviewPackage[] = [
  {
    id: '1',
    title: 'Basic Flight Review',
    description: 'Standard drone flight review following RPAS regulations.',
    price: 150,
    package_type: 'standard',
    enabled: true,
    reviewer_id: '5',
    create_time: '2024-01-10T10:00:00Z',
    update_time: '2024-01-10T10:00:00Z'
  },
  {
    id: '2',
    title: 'Advanced Flight Review',
    description: 'Comprehensive flight review with advanced maneuvers and emergency procedures.',
    price: 250,
    package_type: 'premium',
    enabled: true,
    reviewer_id: '5',
    create_time: '2024-01-15T11:30:00Z',
    update_time: '2024-02-20T14:15:00Z'
  },
  {
    id: '3',
    title: 'Commercial Operator Review',
    description: 'Specialized review for commercial drone operators with business-specific scenarios.',
    price: 350,
    package_type: 'premium',
    enabled: true,
    reviewer_id: '8',
    create_time: '2024-02-01T09:45:00Z',
    update_time: '2024-02-01T09:45:00Z'
  },
  {
    id: '4',
    title: 'Night Operations Review',
    description: 'Specialized review for night flight operations and low-light conditions.',
    price: 275,
    package_type: 'custom',
    enabled: false,
    reviewer_id: '8',
    create_time: '2024-02-15T13:20:00Z',
    update_time: '2024-03-05T10:30:00Z'
  },
  {
    id: '5',
    title: 'Refresher Review',
    description: 'Quick refresher review for pilots who need to renew their certification.',
    price: 125,
    package_type: 'standard',
    enabled: true,
    reviewer_id: '5',
    create_time: '2024-03-01T15:00:00Z',
    update_time: '2024-03-01T15:00:00Z'
  }
];
