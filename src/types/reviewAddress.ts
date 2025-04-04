
export interface ReviewAddress {
  id: string;
  province: string;
  city: string;
  street: string;
  postal_code: string;
  review_street_desc?: string;
  address_customized?: string;
  latitude: number;
  longitude: number;
  enabled: boolean;
  reviewer_id: string;
  create_time: string;
  update_time: string;
}

export const provinces = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Nova Scotia',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Northwest Territories',
  'Nunavut',
  'Yukon'
];

// Mock data for review addresses
export const mockReviewAddresses: ReviewAddress[] = [
  {
    id: '1',
    province: 'Ontario',
    city: 'Toronto',
    street: '123 Maple Ave',
    postal_code: 'M5V 2T6',
    review_street_desc: 'Large open field near community center',
    latitude: 43.6532,
    longitude: -79.3832,
    enabled: true,
    reviewer_id: '5',
    create_time: '2024-01-05T11:15:00Z',
    update_time: '2024-01-05T11:15:00Z'
  },
  {
    id: '2',
    province: 'British Columbia',
    city: 'Vancouver',
    street: '456 Pacific Blvd',
    postal_code: 'V6B 5E1',
    address_customized: 'Seaside Park - North Entrance',
    latitude: 49.2827,
    longitude: -123.1207,
    enabled: true,
    reviewer_id: '5',
    create_time: '2024-01-20T13:45:00Z',
    update_time: '2024-02-15T09:30:00Z'
  },
  {
    id: '3',
    province: 'Alberta',
    city: 'Calgary',
    street: '789 Mountain View Rd',
    postal_code: 'T2P 2M5',
    review_street_desc: 'Open area with good visibility, minimal obstacles',
    latitude: 51.0447,
    longitude: -114.0719,
    enabled: false,
    reviewer_id: '8',
    create_time: '2024-02-10T10:20:00Z',
    update_time: '2024-03-01T15:40:00Z'
  },
  {
    id: '4',
    province: 'Quebec',
    city: 'Montreal',
    street: '321 Rue Sainte-Catherine',
    postal_code: 'H2X 1K4',
    address_customized: 'Montreal Technopark - Drone Testing Area',
    latitude: 45.5017,
    longitude: -73.5673,
    enabled: true,
    reviewer_id: '8',
    create_time: '2024-02-25T14:10:00Z',
    update_time: '2024-02-25T14:10:00Z'
  },
  {
    id: '5',
    province: 'Manitoba',
    city: 'Winnipeg',
    street: '654 Portage Ave',
    postal_code: 'R3B 2B9',
    review_street_desc: 'City park with designated drone flying area',
    latitude: 49.8951,
    longitude: -97.1384,
    enabled: true,
    reviewer_id: '5',
    create_time: '2024-03-05T09:00:00Z',
    update_time: '2024-03-15T11:25:00Z'
  },
  {
    id: '6',
    province: 'Nova Scotia',
    city: 'Halifax',
    street: '987 Waterfront Dr',
    postal_code: 'B3J 3K5',
    review_street_desc: 'Coastal area with clear landing zones',
    latitude: 44.6488,
    longitude: -63.5752,
    enabled: true,
    reviewer_id: '6',
    create_time: '2024-02-08T12:35:00Z',
    update_time: '2024-02-08T12:35:00Z'
  },
  {
    id: '7',
    province: 'Saskatchewan',
    city: 'Saskatoon',
    street: '456 Prairie View Rd',
    postal_code: 'S7K 0J5',
    address_customized: 'University Research Field - Drone Test Site',
    latitude: 52.1332,
    longitude: -106.6700,
    enabled: false,
    reviewer_id: '6',
    create_time: '2024-01-15T09:50:00Z',
    update_time: '2024-03-10T14:20:00Z'
  },
  {
    id: '8',
    province: 'Alberta',
    city: 'Edmonton',
    street: '789 Capital Blvd',
    postal_code: 'T5J 4P6',
    review_street_desc: 'Industrial zone with designated flight corridor',
    latitude: 53.5461,
    longitude: -113.4938,
    enabled: true,
    reviewer_id: '7',
    create_time: '2024-02-22T15:40:00Z',
    update_time: '2024-02-22T15:40:00Z'
  },
  {
    id: '9',
    province: 'Ontario',
    city: 'Ottawa',
    street: '123 Parliament Way',
    postal_code: 'K1P 5M7',
    address_customized: 'River Valley Flight Zone - Site 3',
    latitude: 45.4215,
    longitude: -75.6972,
    enabled: true,
    reviewer_id: '7',
    create_time: '2024-03-01T11:05:00Z',
    update_time: '2024-03-14T13:45:00Z'
  },
  {
    id: '10',
    province: 'British Columbia',
    city: 'Victoria',
    street: '456 Harbour Front',
    postal_code: 'V8W 1W5',
    review_street_desc: 'Coastal training area with varying terrain',
    latitude: 48.4284,
    longitude: -123.3656,
    enabled: true,
    reviewer_id: '5',
    create_time: '2024-01-28T10:15:00Z',
    update_time: '2024-01-28T10:15:00Z'
  }
];
