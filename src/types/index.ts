export interface Sensor {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  status: 'Normal' | 'Siaga' | 'Bahaya';
  temperature: number;
  moisture: number;
  movement: number;
  lastUpdate: string;
  history: SensorReading[];
}

export interface SensorReading {
  timestamp: string;
  temperature: number;
  moisture: number;
  movement: number;
}

export interface Report {
  id: string;
  name: string;
  location: string;
  latitude?: number;
  longitude?: number;
  description: string;
  imageUrl?: string;
  status: 'Pending' | 'Verified' | 'Resolved';
  createdAt: string;
}

export interface EducationContent {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl?: string;
  category: string;
  tags: string[];
}
