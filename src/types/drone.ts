
export interface Drone {
  id: string;
  manufacturer: string;
  model: string;
  serialno: string;
  registrationnumber: string;
  nickname: string;
  color: string;
  threshold: number;
  availability: boolean;
  certificateFile?: string;
  user_id: string;
  create_time: string;
  update_time: string;
}

// Mock data for drones
export const mockDrones: Drone[] = [
  {
    id: '1',
    manufacturer: 'DJI',
    model: 'Mavic 3 Pro',
    serialno: 'DJI1234567',
    registrationnumber: 'REG-123-456',
    nickname: 'Eagle Eye',
    color: 'Gray',
    threshold: 100,
    availability: true,
    certificateFile: 'certificate1.pdf',
    user_id: '1',
    create_time: '2024-03-15T10:30:00Z',
    update_time: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    manufacturer: 'Autel Robotics',
    model: 'EVO II',
    serialno: 'AUT7654321',
    registrationnumber: 'REG-789-012',
    nickname: 'Red Dragon',
    color: 'Orange',
    threshold: 120,
    availability: true,
    certificateFile: 'certificate2.pdf',
    user_id: '1',
    create_time: '2024-02-20T09:15:00Z',
    update_time: '2024-03-10T14:45:00Z'
  },
  {
    id: '3',
    manufacturer: 'Skydio',
    model: 'Skydio 2+',
    serialno: 'SKY9876543',
    registrationnumber: 'REG-345-678',
    nickname: 'Pathfinder',
    color: 'Blue',
    threshold: 90,
    availability: false,
    certificateFile: 'certificate3.pdf',
    user_id: '2',
    create_time: '2024-01-05T13:20:00Z',
    update_time: '2024-01-05T13:20:00Z'
  },
  {
    id: '4',
    manufacturer: 'DJI',
    model: 'Phantom 4 Pro',
    serialno: 'DJI2468101',
    registrationnumber: 'REG-901-234',
    nickname: 'Ghost',
    color: 'White',
    threshold: 110,
    availability: true,
    certificateFile: 'certificate4.pdf',
    user_id: '3',
    create_time: '2023-12-10T11:05:00Z',
    update_time: '2024-02-18T16:30:00Z'
  },
  {
    id: '5',
    manufacturer: 'Parrot',
    model: 'Anafi',
    serialno: 'PAR1357911',
    registrationnumber: 'REG-567-890',
    nickname: 'Hummingbird',
    color: 'Green',
    threshold: 80,
    availability: true,
    certificateFile: 'certificate5.pdf',
    user_id: '4',
    create_time: '2024-03-01T08:45:00Z',
    update_time: '2024-03-01T08:45:00Z'
  }
];

export const droneColors = [
  'Black',
  'White',
  'Gray',
  'Blue',
  'Red',
  'Green',
  'Yellow',
  'Orange',
  'Purple',
  'Silver'
];

export const droneManufacturers = [
  'DJI',
  'Autel Robotics',
  'Skydio',
  'Parrot',
  'Yuneec',
  'PowerVision',
  'FIMI',
  'Holy Stone',
  'Hubsan',
  'Ryze'
];

export const droneModels = [
  'Mavic 3 Pro',
  'Mavic 3 Classic',
  'Mavic 2 Pro',
  'Mavic Air 2',
  'Mini 3 Pro',
  'Phantom 4 Pro',
  'EVO II',
  'Skydio 2+',
  'Anafi',
  'Typhoon H3'
];
