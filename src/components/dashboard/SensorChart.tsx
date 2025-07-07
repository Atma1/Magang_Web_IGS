import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Sensor } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SensorChartProps {
  sensors: Sensor[];
}

const SensorChart: React.FC<SensorChartProps> = ({ sensors }) => {
  const [selectedSensor, setSelectedSensor] = useState<Sensor>(sensors[0]);
  const [dataType, setDataType] = useState<'temperature' | 'moisture' | 'movement'>('temperature');

  const handleSensorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    const sensor = sensors.find(s => s.id == e.target.value);
    if (sensor) setSelectedSensor(sensor);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const chartData = {
    labels: [...selectedSensor.history].reverse().map(reading => formatTime(reading.timestamp)),
    datasets: [
      {
        label: dataType.charAt(0).toUpperCase() + dataType.slice(1),
        data: [...selectedSensor.history].reverse().map(reading => reading[dataType]),
        borderColor: dataType === 'temperature' ? '#ef4444' : dataType === 'moisture' ? '#0ea5e9' : '#8b5cf6',
        backgroundColor: dataType === 'temperature' ? 'rgba(239, 68, 68, 0.1)' : dataType === 'moisture' ? 'rgba(14, 165, 233, 0.1)' : 'rgba(139, 92, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  return (
    <div>
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between mb-4">
        <div className="w-full md:w-auto mb-2 md:mb-0">
          <label htmlFor="sensor-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select Sensor
          </label>
          <select
            id="sensor-select"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            value={selectedSensor.id}
            onChange={handleSensorChange}
          >
            {sensors.map((sensor) => (
              <option key={sensor.id} value={sensor.id}>
                {sensor.name} - {sensor.location}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setDataType('temperature')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${dataType === 'temperature'
              ? 'bg-red-100 text-red-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Temperature
          </button>
          <button
            onClick={() => setDataType('moisture')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${dataType === 'moisture'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Moisture
          </button>
          <button
            onClick={() => setDataType('movement')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${dataType === 'movement'
              ? 'bg-purple-100 text-purple-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Movement
          </button>
        </div>
      </div>

      <div className="h-80">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default SensorChart;
