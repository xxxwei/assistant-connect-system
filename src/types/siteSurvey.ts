
export interface SiteSurvey {
  id: string;
  title: string;
  mission_reference_no: string;
  user_id: string;
  email: string;
  startLocal: string;
  endLocal: string;
  survey_type: string;
  drone_id: string;
  pilotname: string;
  latitude: number;
  longitude: number;
  controlled: boolean;
  
  // User Info
  phone?: string;
  adminEmail?: string;
  usertype?: string;
  locale?: string;
  mobile?: string;
  address?: string;
  
  // Mission Info
  start?: string;
  end?: string;
  order_id?: string;
  flight_school?: string;
  create_time?: string;
  
  // Customer Info
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  
  // Drone Info
  dronecolor?: string;
  droneregistrationnumber?: string;
  manufacturer?: string;
  rpas?: string;
  serialno?: string;
  
  // Pilot Info
  pilot_id?: string;
  pilotphone?: string;
  pilotlicense?: string;
  
  // Observer Info
  observername?: string;
  payloadoperatorname?: string;
  
  // Location Info
  operationradius?: number;
  radiusunit?: string;
  operationaltitude?: number;
  fir?: string;
  air_status?: string;
  nearestAerodromes?: string;
  markers?: string; // JSON string of marker positions
  
  // Image
  map_img?: string;
}

export type SurveyType = 'inspection' | 'mapping' | 'photography' | 'videography' | 'training' | 'other';

export const surveyTypes: SurveyType[] = [
  'inspection',
  'mapping',
  'photography',
  'videography',
  'training',
  'other'
];
