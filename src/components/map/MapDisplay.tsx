import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Sensor } from '../../types';

interface MapDisplayProps {
  sensors: Sensor[];
}

const MapDisplay: React.FC<MapDisplayProps> = ({ sensors }) => {
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const mapCenter = {
    lat: -6.9122,
    lng: 107.6194,
  };

  const getMarkerIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'normal':
        return '/markers/marker-green.png';
      case 'siaga':
        return '/markers/marker-yellow.png';
      case 'bahaya':
        return '/markers/marker-red.png';
      default:
        return '/markers/marker-blue.png';
    }
  };

  const handleMarkerClick = (sensor: Sensor) => {
    setSelectedSensor(sensor);
  };

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };

  if (!isLoaded) return <div className="flex items-center justify-center h-full">Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={mapCenter}
      zoom={13}
      options={{
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      }}
    >
      {sensors.map((sensor) => (
        <Marker
          key={sensor.id}
          position={{ lat: sensor.latitude, lng: sensor.longitude }}
          icon={{
            url: getMarkerIcon(sensor.status),
            scaledSize: new window.google.maps.Size(30, 40),
          }}
          onClick={() => handleMarkerClick(sensor)}
          animation={window.google.maps.Animation.DROP}
        />
      ))}

      {selectedSensor && (
        <InfoWindow
          position={{ lat: selectedSensor.latitude, lng: selectedSensor.longitude }}
          onCloseClick={() => setSelectedSensor(null)}
        >
          <div className="p-2 max-w-xs">
            <h3 className="font-bold text-gray-800">{selectedSensor.name}</h3>
            <div className="my-2 text-sm text-gray-600">{selectedSensor.location}</div>
            
            <div className="grid grid-cols-3 gap-2 my-2 text-xs">
              <div className="text-center p-1 bg-gray-100 rounded">
                <div className="font-semibold">{selectedSensor.temperature}°C</div>
                <div>Temp</div>
              </div>
              <div className="text-center p-1 bg-gray-100 rounded">
                <div className="font-semibold">{selectedSensor.moisture}%</div>
                <div>Moisture</div>
              </div>
              <div className="text-center p-1 bg-gray-100 rounded">
                <div className="font-semibold">{selectedSensor.movement}mm</div>
                <div>Movement</div>
              </div>
            </div>
            
            <div className={`text-center p-1 mt-2 rounded font-medium text-sm
              ${
                selectedSensor.status === 'Normal'
                  ? 'bg-success-100 text-success-700'
                  : selectedSensor.status === 'Siaga'
                  ? 'bg-warning-100 text-warning-700'
                  : 'bg-danger-100 text-danger-700'
              }
            `}>
              Status: {selectedSensor.status}
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapDisplay;
