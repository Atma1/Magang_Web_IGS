import React from 'react';

interface MapFilterProps {
  onFilterChange: (status: string | null) => void;
  filter: string | null
}

const MapFilter: React.FC<MapFilterProps> = ({ onFilterChange, filter }) => {
  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="text-gray-700 font-medium mb-2 sm:mb-0">Filter sensors by status:</div>

      <div className="flex space-x-2">
        <button
          onClick={() => onFilterChange(null)}
          className={`px-3 py-1 rounded-md text-sm font-medium ${filter === null
            ? 'bg-gray-200 text-gray-800'
            : ''
            }`}
        >
          All
        </button>

        <button
          onClick={() => onFilterChange('Normal')}
          className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'Normal'
            ? 'bg-gray-200 text-gray-800'
            : ''
            }`}
        >
          Normal
        </button>

        <button
          onClick={() => onFilterChange('Siaga')}
          className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'Siaga'
            ? 'bg-gray-200 text-gray-800'
            : ''
            }`}
        >
          Siaga
        </button>

        <button
          onClick={() => onFilterChange('Bahaya')}
          className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'Bahaya'
            ? 'bg-gray-200 text-gray-800'
            : ''
            }`}
        >
          Bahaya
        </button>
      </div>
    </div>
  );
};

export default MapFilter;
