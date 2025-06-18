import React from 'react';

const MapLegend: React.FC = () => {
  const legendItems = [
    { status: 'Normal', color: 'text-green-700', description: 'Stable conditions, normal sensor readings' },
    { status: 'Siaga', color: 'text-yellow-700', description: 'Elevated risk, careful monitoring required' },
    { status: 'Bahaya', color: 'text-red-700', description: 'Critical risk, immediate action required' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center md:justify-start space-x-4 py-2">
      <div className="text-gray-700 font-medium">Status Legend:</div>

      {legendItems.map((item) => (
        <div key={item.status} className='flex items-center'>
          <div className={`mr-1 ${item.color} font-bold`}>{item.status}:</div>
          <div className="text-gray-600 text-sm hidden md:inline">{item.description}</div>
        </div>
      ))}
    </div>
  );
};

export default MapLegend;
