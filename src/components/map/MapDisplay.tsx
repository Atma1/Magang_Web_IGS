import React, { useRef, useState, useEffect } from 'react';
import Map, { FullscreenControl, GeolocateControl, MapRef, Marker, NavigationControl, Popup } from 'react-map-gl/mapbox'
import { Sensor } from '@/types';
import { IoCloseCircle } from 'react-icons/io5';
import "mapbox-gl/dist/mapbox-gl.css";

interface MapDisplayProps {
  sensors: Sensor[];
  querySensor: string;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ sensors, querySensor }) => {
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [viewState, setViewState] = useState({
    longitude: 107.6194,
    latitude: -6.9122,
    zoom: 12
  });

  useEffect(() => {
    if (querySensor !== 'none' && sensors.length > 0) {
      const foundSensor = sensors.find((sensor) => sensor.id === querySensor);
      if (foundSensor) {
        setSelectedSensor(foundSensor);
      }
    }
  }, [querySensor, sensors]);

  const getMarkerColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'normal':
        return '#22c55e'; // green
      case 'siaga':
        return '#eab308'; // yellow
      case 'bahaya':
        return '#ef4444'; // red
      default:
        return '#3b82f6'; // blue
    }
  };

  const handleMarkerClick = (sensor: Sensor) => {
    setSelectedSensor(sensor);
  };

  const mapRef = useRef<MapRef>(null);

  return (
    <Map
      ref={mapRef}
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
    >
      <FullscreenControl />
      <GeolocateControl />
      <NavigationControl />
      {sensors.map((sensor) => (
        <Marker
          key={sensor.id}
          longitude={sensor.longitude}
          latitude={sensor.latitude}
          anchor="bottom"
          onClick={() => handleMarkerClick(sensor)}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: getMarkerColor(sensor.status),
              border: '2px solid white',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          />
        </Marker>
      ))}

      {selectedSensor && (
        <Popup
          longitude={selectedSensor.longitude}
          latitude={selectedSensor.latitude}
          anchor="top"
          onClose={() => setSelectedSensor(null)}
          closeButton={false}
          closeOnClick={false}
        >
          <div className="p-2 max-w-xs">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-800">{selectedSensor.name}</h3>
              <button
                onClick={() => setSelectedSensor(null)}
                className="text-gray-500 hover:text-gray-700 text-lg font-bold"
              >
                <IoCloseCircle />
              </button>
            </div>
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
              ${selectedSensor.status === 'Normal'
                ? 'bg-success-100 text-green-700'
                : selectedSensor.status === 'Siaga'
                  ? 'bg-warning-100 text-yellow-700'
                  : 'bg-danger-100 text-red-700'
              }
            `}>
              Status: {selectedSensor.status}
            </div>
          </div>
        </Popup>
      )}
    </Map>
  );
};

export default MapDisplay;
