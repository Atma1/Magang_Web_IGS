import { useState, useEffect } from 'react';
import { Sensor } from '@/types';

// This is a mock implementation, in a real app you'd fetch from an API
export const useSensors = () => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data - in production, replace with API call
        const mockSensors: Sensor[] = [
          {
            id: 's001',
            name: 'Sensor Alpha',
            location: 'Bukit Tinggi, West Zone',
            latitude: -6.9122,
            longitude: 107.6194,
            status: 'Normal',
            temperature: 24.5,
            moisture: 65.3,
            movement: 0.2,
            lastUpdate: new Date().toISOString(),
            history: Array(24).fill(0).map((_, i) => ({
              timestamp: new Date(Date.now() - i * 3600000).toISOString(),
              temperature: 24 + Math.sin(i / 3) * 2,
              moisture: 65 + Math.cos(i / 2) * 5,
              movement: Math.max(0.1, Math.random() * 0.4)
            }))
          },
          {
            id: 's002',
            name: 'Sensor Beta',
            location: 'Valley View, North Zone',
            latitude: -6.9234,
            longitude: 107.6011,
            status: 'Siaga',
            temperature: 26.8,
            moisture: 78.1,
            movement: 1.5,
            lastUpdate: new Date().toISOString(),
            history: Array(24).fill(0).map((_, i) => ({
              timestamp: new Date(Date.now() - i * 3600000).toISOString(),
              temperature: 26 + Math.sin(i / 4) * 2,
              moisture: 75 + Math.sin(i / 2) * 10,
              movement: Math.max(0.5, 1 + Math.sin(i / 3) * 1)
            }))
          },
          {
            id: 's003',
            name: 'Sensor Gamma',
            location: 'Hillside Residences, East Zone',
            latitude: -6.9015,
            longitude: 107.6451,
            status: 'Bahaya',
            temperature: 28.1,
            moisture: 89.7,
            movement: 3.8,
            lastUpdate: new Date().toISOString(),
            history: Array(24).fill(0).map((_, i) => ({
              timestamp: new Date(Date.now() - i * 3600000).toISOString(),
              temperature: 28 + Math.random() * 2,
              moisture: 80 + Math.random() * 15,
              movement: 2 + Math.random() * 2.5
            }))
          },
          {
            id: 's004',
            name: 'Sensor Delta',
            location: 'Mountain Pass, South Zone',
            latitude: -6.9416,
            longitude: 107.6322,
            status: 'Normal',
            temperature: 23.7,
            moisture: 60.2,
            movement: 0.1,
            lastUpdate: new Date().toISOString(),
            history: Array(24).fill(0).map((_, i) => ({
              timestamp: new Date(Date.now() - i * 3600000).toISOString(),
              temperature: 23 + Math.sin(i / 5) * 1.5,
              moisture: 60 + Math.cos(i / 4) * 4,
              movement: Math.max(0.05, Math.random() * 0.2)
            }))
          }
        ];

        setSensors(mockSensors);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setLoading(false);
      }
    };

    fetchSensors();
  }, []);

  return { sensors, loading, error };
};
