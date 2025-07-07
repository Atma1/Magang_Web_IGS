import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaThermometerHalf, FaTint, FaExclamationTriangle } from 'react-icons/fa';
import { Sensor } from '../../types';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface AdminSensorSummaryProps {
    sensors: Sensor[];
}

const AdminSensorSummary = ({ sensors }: AdminSensorSummaryProps) => {
    const [sensorsList, setSensorsList] = useState<Sensor[]>([]);

    useEffect(() => {
        const fetchSensors = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors`);
                setSensorsList(response.data);
            } catch (error) {
                console.error('Error fetching sensors:', error);
            }
        };

        fetchSensors();
    }, []);

    const normalSensors = sensorsList.filter(s => s.status === 'Normal');
    const siagaSensors = sensorsList.filter(s => s.status === 'Siaga');
    const bahayaSensors = sensorsList.filter(s => s.status === 'Bahaya');

    const avgTemperature = sensorsList.length > 0
        ? sensorsList.reduce((acc, sensor) => acc + sensor.temperature, 0) / sensorsList.length
        : 0;

    const avgMoisture = sensorsList.length > 0
        ? sensorsList.reduce((acc, sensor) => acc + sensor.moisture, 0) / sensorsList.length
        : 0;

    const avgMovement = sensorsList.length > 0
        ? sensorsList.reduce((acc, sensor) => acc + sensor.movement, 0) / sensorsList.length
        : 0;

    const stats = [
        {
            title: 'Total Sensors',
            value: sensorsList.length,
            icon: FaMapMarkerAlt,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            title: 'Normal Status',
            value: normalSensors.length,
            icon: FaThermometerHalf,
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50'
        },
        {
            title: 'Siaga Status',
            value: siagaSensors.length,
            icon: FaExclamationTriangle,
            color: 'from-yellow-500 to-yellow-600',
            bgColor: 'bg-yellow-50'
        },
        {
            title: 'Bahaya Status',
            value: bahayaSensors.length,
            icon: FaExclamationTriangle,
            color: 'from-red-500 to-red-600',
            bgColor: 'bg-red-50'
        }
    ];

    const averageStats = [
        {
            title: 'Avg Temperature',
            value: `${avgTemperature.toFixed(1)}°C`,
            icon: FaThermometerHalf,
            color: 'from-orange-500 to-orange-600'
        },
        {
            title: 'Avg Moisture',
            value: `${avgMoisture.toFixed(1)}%`,
            icon: FaTint,
            color: 'from-blue-500 to-blue-600'
        },
        {
            title: 'Avg Movement',
            value: `${avgMovement.toFixed(2)}mm`,
            icon: FaExclamationTriangle,
            color: 'from-purple-500 to-purple-600'
        }
    ];

    return (
        <div className="space-y-8">
            {/* Status Overview */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">System Status Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <motion.div
                                key={stat.title}
                                className={`glass-intense rounded-2xl p-6 ${stat.bgColor} border border-white/20`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02, y: -5 }}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                                        <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                                    </div>
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                                        <IconComponent className="text-white text-xl" />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Average Values */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Average Sensor Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {averageStats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <motion.div
                                key={stat.title}
                                className="glass-intense rounded-2xl p-6 bg-white/50 border border-white/20"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.4 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                        <IconComponent className="text-white text-lg" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                        <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Sensors List */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">All Sensors</h2>
                <div className="glass-intense rounded-2xl p-6 bg-white/50 border border-white/20">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Sensor</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Temperature</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Moisture</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Movement</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sensorsList.map((sensor, index) => (
                                    <motion.tr
                                        key={sensor.id}
                                        className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <td className="py-4 px-4">
                                            <div className="font-medium text-gray-800">{sensor.name}</div>
                                            <div className="text-sm text-gray-500">s-00{sensor.id}</div>
                                        </td>
                                        <td className="py-4 px-4 text-gray-600">{sensor.location}</td>
                                        <td className="py-4 px-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${sensor.status === 'Normal' ? 'bg-green-100 text-green-800' :
                                                sensor.status === 'Siaga' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {sensor.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-gray-600">{sensor.temperature}°C</td>
                                        <td className="py-4 px-4 text-gray-600">{sensor.moisture}%</td>
                                        <td className="py-4 px-4 text-gray-600">{sensor.movement}mm</td>
                                        <td className="py-4 px-4 text-gray-500 text-sm">{sensor.lastUpdate}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSensorSummary;
