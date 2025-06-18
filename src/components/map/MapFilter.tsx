import React from 'react';

interface MapFilterProps {
  onFilterChange: (status: string | null) => void;
}

const MapFilter: React.FC<MapFilterProps> = ({ onFilterChange }) => {
  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="text-gray-700 font-medium mb-2 sm:mb-0">Filter sensors by status:</div>
      
      <div className="flex space-x-2">
        <button
          onClick={() => onFilterChange(null)}
          className="px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          All
        </button>
        
        <button
          onClick={() => onFilterChange('Normal')}
          className="px-3 py-1 rounded-md text-sm font-medium bg-success-100 text-success-600 hover:bg-success-200"
        >
          Normal
        </button>
        
        <button
          onClick={() => onFilterChange('Siaga')}
          className="px-3 py-1 rounded-md text-sm font-medium bg-warning-100 text-warning-600 hover:bg-warning-200"
        >
          Siaga
        </button>
        
        <button
          onClick={() => onFilterChange('Bahaya')}
          className="px-3 py-1 rounded-md text-sm font-medium bg-danger-100 text-danger-600 hover:bg-danger-200"
        >
          Bahaya
        </button>
      </div>
    </div>
  );
};

export default MapFilter;
