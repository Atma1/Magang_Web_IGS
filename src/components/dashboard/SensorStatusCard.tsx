import { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaMapMarkerAlt,
  FaTemperatureHigh,
  FaTint,
  FaArrowsAltH,
  FaExternalLinkAlt,
  FaShieldAlt,
  FaExclamationTriangle,
  FaExclamationCircle
} from 'react-icons/fa';
import { Sensor } from '../../types';

interface SensorStatusCardProps {
  sensor: Sensor;
}

const SensorStatusCard: FC<SensorStatusCardProps> = ({ sensor }) => {
  const getStatusConfig = (status: Sensor['status']) => {
    switch (status) {
      case 'Normal':
        return {
          gradient: 'from-emerald-400 via-blue-500 to-purple-600',
          bgClass: 'bg-gradient-to-br from-emerald-50 to-blue-50',
          borderClass: 'border-emerald-200',
          icon: FaShieldAlt,
          iconColor: 'text-emerald-600',
          statusBg: 'bg-gradient-to-r from-emerald-400 to-blue-500',
          statusText: 'text-white',
          glowClass: 'neon-green'
        };
      case 'Siaga':
        return {
          gradient: 'from-yellow-400 via-orange-500 to-red-500',
          bgClass: 'bg-gradient-to-br from-yellow-50 to-orange-50',
          borderClass: 'border-yellow-200',
          icon: FaExclamationTriangle,
          iconColor: 'text-yellow-600',
          statusBg: 'bg-gradient-to-r from-yellow-400 to-orange-500',
          statusText: 'text-white',
          glowClass: 'neon-pink'
        };
      case 'Bahaya':
        return {
          gradient: 'from-red-400 via-pink-500 to-purple-600',
          bgClass: 'bg-gradient-to-br from-red-50 to-pink-50',
          borderClass: 'border-red-200',
          icon: FaExclamationCircle,
          iconColor: 'text-red-600',
          statusBg: 'bg-gradient-to-r from-red-400 to-pink-500',
          statusText: 'text-white',
          glowClass: 'neon-blue'
        };
      default:
        return {
          gradient: 'from-gray-400 to-gray-600',
          bgClass: 'bg-gradient-to-br from-gray-50 to-gray-100',
          borderClass: 'border-gray-200',
          icon: FaShieldAlt,
          iconColor: 'text-gray-600',
          statusBg: 'bg-gradient-to-r from-gray-400 to-gray-600',
          statusText: 'text-white',
          glowClass: ''
        };
    }
  };

  const statusConfig = getStatusConfig(sensor.status);

  const dataPoints = [
    {
      icon: FaTemperatureHigh,
      label: 'Temperature',
      value: `${sensor.temperature}°C`,
      color: 'text-red-500',
      bgColor: 'bg-gradient-to-br from-red-100 to-pink-100',
      borderColor: 'border-red-200'
    },
    {
      icon: FaTint,
      label: 'Moisture',
      value: `${sensor.moisture}%`,
      color: 'text-blue-500',
      bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100',
      borderColor: 'border-blue-200'
    },
    {
      icon: FaArrowsAltH,
      label: 'Movement',
      value: `${sensor.movement} mm`,
      color: 'text-purple-500',
      bgColor: 'bg-gradient-to-br from-purple-100 to-pink-100',
      borderColor: 'border-purple-200'
    },
  ];

  return (
    <motion.div
      className={`rounded-3xl overflow-hidden hover-lift group border-2 ${statusConfig.borderClass} rainbow-shimmer`}
      whileHover={{ scale: 1.02, y: -8 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* Header dengan Gradient Colorful */}
      <div className={`relative p-6 pb-4 ${statusConfig.bgClass}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <motion.h3
              className="text-2xl font-bold text-gray-800 mb-2"
              whileHover={{ scale: 1.05 }}
            >
              {sensor.name}
            </motion.h3>
            <div className="flex items-center text-gray-600 text-sm">
              <FaMapMarkerAlt className="mr-2 text-blue-500" />
              <span className="font-medium">{sensor.location}</span>
            </div>
          </div>

          <motion.div
            className={`flex items-center space-x-2 px-4 py-2 rounded-2xl ${statusConfig.statusBg} shadow-lg`}
            whileHover={{ scale: 1.05, rotate: 5 }}
            animate={sensor.status === 'Bahaya' ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: sensor.status === 'Bahaya' ? Infinity : 0, duration: 2 }}
          >
            <statusConfig.icon className={`text-sm ${statusConfig.statusText}`} />
            <span className={`text-sm font-bold ${statusConfig.statusText}`}>
              {sensor.status}
            </span>
          </motion.div>
        </div>

        {/* Status Indicator Rainbow Line */}
        <motion.div
          className={`h-2 rounded-full bg-gradient-to-r ${statusConfig.gradient} shadow-lg`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        />
      </div>

      {/* Data Points dengan Colorful Cards */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-3 gap-4">
          {dataPoints.map((point, index) => (
            <motion.div
              key={point.label}
              className={`${point.bgColor} ${point.borderColor} border rounded-2xl p-4 text-center z-10`}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <point.icon className={`mx-auto mb-3 text-2xl ${point.color}`} />
              </motion.div>
              <div className="text-gray-800 font-bold text-lg">{point.value}</div>
              <div className="text-gray-600 text-xs mt-1 font-medium">{point.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer dengan Gradient Button */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500 font-medium z-10">
            Updated: {new Date(sensor.lastUpdate).toLocaleTimeString()}
          </div>

          <Link href={`/map?sensor=${sensor.id}`} className="relative z-10">
            <motion.div
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:from-purple-600 hover:to-blue-500 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Sensor</span>
              <FaExternalLinkAlt className="text-xs" />
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Hover Rainbow Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-purple-400/5 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        initial={false}
      />
    </motion.div>
  );
};

export default SensorStatusCard;
