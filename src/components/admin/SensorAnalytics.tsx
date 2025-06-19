import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaChartBar, FaMapMarkerAlt, FaCalendarAlt, FaDownload } from 'react-icons/fa';
import { Sensor } from '../../types';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from 'recharts';

interface SensorAnalyticsProps {
    sensors: Sensor[];
}

const SensorAnalytics = ({ sensors }: SensorAnalyticsProps) => {
    const [selectedTimeRange, setSelectedTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d');
    const [selectedMetric, setSelectedMetric] = useState<'temperature' | 'moisture' | 'movement'>('temperature');

    // Generate mock time series data
    const timeSeriesData = useMemo(() => {
        const days = selectedTimeRange === '24h' ? 1 :
            selectedTimeRange === '7d' ? 7 :
                selectedTimeRange === '30d' ? 30 : 90;

        const data = [];
        for (let i = days; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);

            data.push({
                date: date.toISOString().split('T')[0],
                temperature: 25 + Math.random() * 10,
                moisture: 50 + Math.random() * 30,
                movement: Math.random() * 5,
                avgTemp: (sensors.reduce((acc, s) => acc + s.temperature, 0) / sensors.length + (Math.random() - 0.5) * 5).toFixed(3),
                avgMoisture: sensors.reduce((acc, s) => acc + s.moisture, 0) / sensors.length + (Math.random() - 0.5) * 10,
                avgMovement: sensors.reduce((acc, s) => acc + s.movement, 0) / sensors.length + Math.random() * 2
            });
        }
        return data;
    }, [selectedTimeRange, sensors]);

    // Status distribution data
    const statusData = [
        { name: 'Normal', value: sensors.filter(s => s.status === 'Normal').length, color: '#10B981' },
        { name: 'Siaga', value: sensors.filter(s => s.status === 'Siaga').length, color: '#F59E0B' },
        { name: 'Bahaya', value: sensors.filter(s => s.status === 'Bahaya').length, color: '#EF4444' }
    ];

    // Sensor performance data
    const performanceData = sensors.map(sensor => ({
        name: sensor.name,
        temperature: sensor.temperature,
        moisture: sensor.moisture,
        movement: sensor.movement,
        score: (100 - sensor.movement * 10 + (sensor.status === 'Normal' ? 20 : sensor.status === 'Siaga' ? 10 : 0))
    }));

    const handleExportData = () => {
        const dataToExport = {
            sensors,
            timeSeriesData,
            statusData,
            performanceData,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sensor-analytics-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-8">
            {/* Header Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Sensor Analytics</h2>
                    <p className="text-gray-600">Detailed insights and trends from your sensor network</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    {/* Time Range Selector */}
                    <div className="flex items-center space-x-2">
                        <FaCalendarAlt className="text-gray-500" />
                        <select
                            value={selectedTimeRange}
                            onChange={(e) => setSelectedTimeRange(e.target.value as any)}
                            className="px-8 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="24h">Last 24 Hours</option>
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                            <option value="90d">Last 90 Days</option>
                        </select>
                    </div>

                    {/* Export Button */}
                    <motion.button
                        onClick={handleExportData}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all flex items-center space-x-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <FaDownload />
                        <span>Export Data</span>
                    </motion.button>
                </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: 'Total Sensors', value: sensors.length, icon: FaMapMarkerAlt, color: 'from-blue-500 to-blue-600' },
                    { title: 'Avg Temperature', value: `${(sensors.reduce((acc, s) => acc + s.temperature, 0) / sensors.length).toFixed(1)}°C`, icon: FaChartLine, color: 'from-orange-500 to-red-600' },
                    { title: 'Avg Moisture', value: `${(sensors.reduce((acc, s) => acc + s.moisture, 0) / sensors.length).toFixed(1)}%`, icon: FaChartBar, color: 'from-blue-500 to-teal-600' },
                    { title: 'Critical Alerts', value: sensors.filter(s => s.status === 'Bahaya').length, icon: FaChartLine, color: 'from-red-500 to-pink-600' }
                ].map((metric, index) => {
                    const IconComponent = metric.icon;
                    return (
                        <motion.div
                            key={metric.title}
                            className="glass-intense rounded-2xl p-6 bg-white/50 border border-white/20"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                                    <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
                                </div>
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                                    <IconComponent className="text-white text-lg" />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Time Series Chart */}
            <motion.div
                className="glass-intense rounded-2xl p-6 bg-white/50 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Sensor Trends</h3>
                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                        <span className="text-sm text-gray-600">Metric:</span>
                        <select
                            value={selectedMetric}
                            onChange={(e) => setSelectedMetric(e.target.value as any)}
                            className="px-8 py-1 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                            <option value="temperature">Temperature</option>
                            <option value="moisture">Moisture</option>
                            <option value="movement">Movement</option>
                        </select>
                    </div>
                </div>

                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={timeSeriesData}>
                            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                            <XAxis
                                dataKey="date"
                                className="text-xs"
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis className="text-xs" tick={{ fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey={selectedMetric === 'temperature' ? 'avgTemp' : selectedMetric === 'moisture' ? 'avgMoisture' : 'avgMovement'}
                                stroke={selectedMetric === 'temperature' ? '#F59E0B' : selectedMetric === 'moisture' ? '#3B82F6' : '#8B5CF6'}
                                strokeWidth={3}
                                dot={{ fill: selectedMetric === 'temperature' ? '#F59E0B' : selectedMetric === 'moisture' ? '#3B82F6' : '#8B5CF6', strokeWidth: 2, r: 4 }}
                                name={selectedMetric === 'temperature' ? 'Avg Temperature (°C)' : selectedMetric === 'moisture' ? 'Avg Moisture (%)' : 'Avg Movement (mm)'}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Status Distribution */}
                <motion.div
                    className="glass-intense rounded-2xl p-6 bg-white/50 border border-white/20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Status Distribution</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, value }: { name: string; value: number }) => `${name}: ${value}`}
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Sensor Performance */}
                <motion.div
                    className="glass-intense rounded-2xl p-6 bg-white/50 border border-white/20"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Sensor Performance Score</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={performanceData.slice(0, 5)}>
                                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                <XAxis
                                    dataKey="name"
                                    className="text-xs"
                                    tick={{ fontSize: 10 }}
                                    angle={-45}
                                    textAnchor="end"
                                    height={60}
                                />
                                <YAxis className="text-xs" tick={{ fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                                <Bar
                                    dataKey="score"
                                    fill="url(#colorGradient)"
                                    radius={[4, 4, 0, 0]}
                                />
                                <defs>
                                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#1E40AF" stopOpacity={0.8} />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Detailed Analytics Table */}
            <motion.div
                className="glass-intense rounded-2xl p-6 bg-white/50 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
            >
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Detailed Sensor Data</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Sensor</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Temp (°C)</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Moisture (%)</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Movement (mm)</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Performance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sensors.map((sensor, index) => {
                                const performance = performanceData.find(p => p.name === sensor.name)?.score || 0;
                                return (
                                    <motion.tr
                                        key={sensor.id}
                                        className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 + 1.2 }}
                                    >
                                        <td className="py-4 px-4">
                                            <div className="font-medium text-gray-800">{sensor.name}</div>
                                            <div className="text-sm text-gray-500">{sensor.id}</div>
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
                                        <td className="py-4 px-4 text-gray-600">{sensor.temperature}</td>
                                        <td className="py-4 px-4 text-gray-600">{sensor.moisture}</td>
                                        <td className="py-4 px-4 text-gray-600">{sensor.movement}</td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${performance >= 80 ? 'bg-green-500' :
                                                            performance >= 60 ? 'bg-yellow-500' :
                                                                'bg-red-500'
                                                            }`}
                                                        style={{ width: `${Math.min(performance, 100)}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-gray-600">
                                                    {performance.toFixed(0)}%
                                                </span>
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default SensorAnalytics;
