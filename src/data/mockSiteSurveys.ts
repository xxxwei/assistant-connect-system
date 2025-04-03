
import { SiteSurvey, surveyTypes } from "@/types/siteSurvey";

// Mock data for site surveys
export const mockSiteSurveys: SiteSurvey[] = Array.from({ length: 30 }).map((_, index) => ({
  id: `survey-${index + 1}`,
  title: `Site Survey ${index + 1}`,
  mission_reference_no: `MSN-${Math.floor(Math.random() * 10000)}`,
  user_id: `user-${Math.floor(Math.random() * 100)}`,
  email: `user${index + 1}@example.com`,
  startLocal: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  endLocal: new Date(Date.now() + Math.random() * 10000000000).toISOString(),
  survey_type: surveyTypes[Math.floor(Math.random() * surveyTypes.length)],
  drone_id: `drone-${Math.floor(Math.random() * 20)}`,
  pilotname: `Pilot ${Math.floor(Math.random() * 10) + 1}`,
  latitude: 40 + Math.random() * 10,
  longitude: -120 + Math.random() * 40,
  controlled: Math.random() > 0.5,
  
  // Additional fields
  phone: `555-${Math.floor(Math.random() * 9000) + 1000}`,
  adminEmail: 'admin@example.com',
  usertype: Math.random() > 0.5 ? 'admin' : 'regular',
  locale: 'en-US',
  mobile: `555-${Math.floor(Math.random() * 9000) + 1000}`,
  address: `${Math.floor(Math.random() * 9000) + 1000} Main St, City, State`,
  
  // Mission Info
  start: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  end: new Date(Date.now() + Math.random() * 10000000000).toISOString(),
  order_id: Math.random() > 0.3 ? `order-${Math.floor(Math.random() * 1000)}` : undefined,
  flight_school: Math.random() > 0.7 ? 'Flight Academy' : undefined,
  create_time: new Date(Date.now() - Math.random() * 20000000000).toISOString(),
  
  // Customer Info
  customer_name: `Customer ${index + 1}`,
  customer_email: `customer${index + 1}@example.com`,
  customer_phone: `555-${Math.floor(Math.random() * 9000) + 1000}`,
  
  // Drone Info
  dronecolor: ['black', 'white', 'gray', 'red'][Math.floor(Math.random() * 4)],
  droneregistrationnumber: `REG-${Math.floor(Math.random() * 10000)}`,
  manufacturer: ['DJI', 'Parrot', 'Yuneec', 'Autel'][Math.floor(Math.random() * 4)],
  rpas: ['Phantom 4', 'Mavic 3', 'Anafi', 'Evo'][Math.floor(Math.random() * 4)],
  serialno: `SN-${Math.floor(Math.random() * 100000)}`,
  
  // Pilot Info
  pilot_id: `P-${Math.floor(Math.random() * 1000)}`,
  pilotphone: `555-${Math.floor(Math.random() * 9000) + 1000}`,
  pilotlicense: `LIC-${Math.floor(Math.random() * 10000)}`,
  
  // Observer Info
  observername: Math.random() > 0.5 ? `Observer ${Math.floor(Math.random() * 10) + 1}` : undefined,
  payloadoperatorname: Math.random() > 0.7 ? `Operator ${Math.floor(Math.random() * 5) + 1}` : undefined,
  
  // Location Info
  operationradius: Math.floor(Math.random() * 500) + 100,
  radiusunit: 'm',
  operationaltitude: Math.floor(Math.random() * 120) + 10,
  fir: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'][Math.floor(Math.random() * 4)],
  air_status: ['clear', 'restricted', 'controlled'][Math.floor(Math.random() * 3)],
  nearestAerodromes: `Aerodrome ${Math.floor(Math.random() * 10) + 1}`,
  markers: JSON.stringify([
    { lat: 41 + Math.random(), lng: -110 + Math.random() * 10 },
    { lat: 41 + Math.random(), lng: -110 + Math.random() * 10 }
  ]),
  
  // Image
  map_img: Math.random() > 0.5 ? '/placeholder.svg' : undefined
}));
