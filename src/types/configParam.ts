
// Configuration parameter types
export interface BusinessLine {
  id: string;
  name: string;
  description: string;
}

export interface ConfigParam {
  id: string;
  businessLineId: string;
  businessLineName?: string; // For display purposes
  type: string;
  key: string;
  value: string;
}

// Mock data for business lines
export const mockBusinessLines: BusinessLine[] = [
  { id: '1', name: 'Sales', description: 'Sales department parameters' },
  { id: '2', name: 'Marketing', description: 'Marketing department parameters' },
  { id: '3', name: 'Operations', description: 'Operations department parameters' },
  { id: '4', name: 'Finance', description: 'Finance department parameters' },
];

// Mock data for configuration parameters
export const mockConfigParams: ConfigParam[] = [
  { id: '1', businessLineId: '1', businessLineName: 'Sales', type: 'Commission', key: 'DefaultRate', value: '0.05' },
  { id: '2', businessLineId: '1', businessLineName: 'Sales', type: 'Commission', key: 'MaxRate', value: '0.15' },
  { id: '3', businessLineId: '1', businessLineName: 'Sales', type: 'Discount', key: 'StandardDiscount', value: '0.1' },
  { id: '4', businessLineId: '2', businessLineName: 'Marketing', type: 'Budget', key: 'QuarterlyAllocation', value: '50000' },
  { id: '5', businessLineId: '2', businessLineName: 'Marketing', type: 'Campaign', key: 'DefaultDuration', value: '30' },
  { id: '6', businessLineId: '3', businessLineName: 'Operations', type: 'Logistics', key: 'ShippingDelay', value: '2' },
  { id: '7', businessLineId: '4', businessLineName: 'Finance', type: 'Tax', key: 'SalesTaxRate', value: '0.085' },
];
