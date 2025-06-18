import React from 'react';

const MapLegend: React.FC = () => {
  const legendItems = [
    { status: 'Normal', color: 'bg-success-500', description: 'Stable conditions, normal sensor readings' },
    { status: 'Siaga', color: 'bg-warning-500', description: 'Elevated risk, careful monitoring required' },
    { status: 'Bahaya', color: 'bg-danger-500', description: 'Critical risk, immediate action required' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center md:justify-start space-x-4 py-2">
      <div className="text-gray-700 font-medium">Status Legend:</div>
      
      {legendItems.map((item) => (
        <div key={item.status} className="flex items-center">
          <div className={`w-4 h-4 rounded-full ${item.color} mr-2`}></div>
          <div className="mr-1">{item.status}:</div>
          <div className="text-gray-600 text-sm hidden md:inline">{item.description}</div>
        </div>
      ))}
    </div>
  );
};

export default MapLegend;
