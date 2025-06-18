import React from 'react';
import { motion } from 'framer-motion';
import { Sensor } from '../../types';
import { FaCheckCircle, FaExclamationTriangle, FaExclamationCircle } from 'react-icons/fa';

interface StatusSummaryProps {
  sensors: Sensor[];
}

const StatusSummary: React.FC<StatusSummaryProps> = ({ sensors }) => {
  const normalCount = sensors.filter(sensor => sensor.status === 'Normal').length;
  const siagaCount = sensors.filter(sensor => sensor.status === 'Siaga').length;
  const bahayaCount = sensors.filter(sensor => sensor.status === 'Bahaya').length;
  
  const statusItems = [
    { 
      status: 'Normal',
      count: normalCount,
      icon: <FaCheckCircle size={32} />,
      gradient: 'bg-gradient-to-br from-emerald-400 to-blue-500',
      textColor: 'text-white',
      description: 'Sensors operating normally'
    },
    { 
      status: 'Siaga',
      count: siagaCount,
      icon: <FaExclamationTriangle size={32} />,
      gradient: 'bg-gradient-to-br from-yellow-400 to-orange-500',
      textColor: 'text-white',
      description: 'Sensors requiring attention'
    },
    { 
      status: 'Bahaya',
      count: bahayaCount,
      icon: <FaExclamationCircle size={32} />,
      gradient: 'bg-gradient-to-br from-red-400 to-pink-500',
      textColor: 'text-white',
      description: 'Sensors in critical condition'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {statusItems.map((item, index) => (
        <motion.div
          key={item.status}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`${item.gradient} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={item.textColor}>
              {item.icon}
            </div>
            <div className="text-right">
              <h3 className={`text-4xl font-bold ${item.textColor}`}>{item.count}</h3>
              <div className={`text-lg font-medium ${item.textColor} opacity-90`}>{item.status}</div>
            </div>
          </div>
          <p className={`text-sm ${item.textColor} opacity-80`}>{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatusSummary;
