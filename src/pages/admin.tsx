import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaPlus, FaChartBar, FaFileAlt, FaTimes, FaBars } from 'react-icons/fa';
import { useSensors } from '../hooks/useSensors';
import AdminSensorSummary from '../components/admin/AdminSensorSummary';
import AddSensorForm from '../components/admin/AddSensorForm';
import AdminReports from '../components/admin/AdminReports';
import SensorAnalytics from '../components/admin/SensorAnalytics';
import Loading from '../components/common/Loading';

const AdminDashboard: NextPage = () => {
    const [activeTab, setActiveTab] = useState<'summary' | 'add-sensor' | 'reports' | 'analytics'>('summary');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { sensors, loading, error } = useSensors();

    if (loading) return <Loading fullScreen />;

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="glass-intense p-10 rounded-3xl text-center max-w-md shadow-2xl">
                    <h2 className="text-3xl font-bold text-red-500 mb-4">Error</h2>
                    <p className="text-gray-600">Unable to load admin dashboard. Please try again later.</p>
                </div>
            </div>
        );
    }

    const menuItems = [
        {
            id: 'summary',
            label: 'Sensor Summary',
            icon: FaChartBar,
            color: 'from-blue-500 to-purple-600'
        },
        {
            id: 'add-sensor',
            label: 'Add Sensors',
            icon: FaPlus,
            color: 'from-green-500 to-teal-600'
        },
        {
            id: 'reports',
            label: 'Check Reports',
            icon: FaFileAlt,
            color: 'from-yellow-500 to-orange-600'
        },
        {
            id: 'analytics',
            label: 'Sensor Analytics',
            icon: FaChartBar,
            color: 'from-pink-500 to-red-600'
        }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'summary':
                return <AdminSensorSummary sensors={sensors} />;
            case 'add-sensor':
                return <AddSensorForm />;
            case 'reports':
                return <AdminReports />;
            case 'analytics':
                return <SensorAnalytics sensors={sensors} />;
            default:
                return <AdminSensorSummary sensors={sensors} />;
        }
    };

    return (
        <div className='pt-24'>
            <Head>
                <title>Admin Dashboard | LEWS</title>
                <meta name="description" content="Admin dashboard for landslide early warning system" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
                {/* Mobile Menu Toggle */}
                <div className="lg:hidden fixed top-4 left-4 z-50">
                    <motion.button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="glass-intense p-3 rounded-xl shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {sidebarOpen ? <FaTimes /> : <FaBars />}
                    </motion.button>
                </div>

                {/* Sidebar */}
                <motion.div
                    className={`fixed left-0 top-0 h-full z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } lg:translate-x-0`}
                    initial={{ x: -300 }}
                    animate={{ x: sidebarOpen ? 0 : -300 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                >
                    <div className="w-80 h-full glass-intense backdrop-blur-xl border-r border-white/20 shadow-2xl">
                        {/* Header */}
                        <div className="p-6 border-b border-white/20">
                            <h1 className='text-2xl font-bold'>
                                Admin Dashboard
                            </h1>
                            <p className="text-gray-600 text-sm mt-2">Atur Smart Alert LEWS</p>
                        </div>

                        {/* Menu Items */}
                        <div className="p-4 space-y-2">
                            {menuItems.map((item, index) => {
                                const IconComponent = item.icon;
                                const isActive = activeTab === item.id;

                                return (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id as any)}
                                        className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${isActive
                                            ? 'bg-gradient-to-r text-white shadow-lg scale-105'
                                            : 'hover:bg-white/50 hover:scale-102'
                                            }`}
                                        style={isActive ? { backgroundImage: `linear-gradient(to right, ${item.color.split(' ')[0]}, ${item.color.split(' ')[2]})` } : {}}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${'bg-gradient-to-br ' + item.color}`}>
                                                <IconComponent className='text-white' />
                                            </div>
                                            <div>
                                                <div className={`font-semibold text-gray-800`}>
                                                    {item.label}
                                                </div>
                                                <div className={`text-sm text-gray-800`}>
                                                    {item.id === 'summary' && `${sensors.length} sensors`}
                                                    {item.id === 'add-sensor' && 'Add new sensors'}
                                                    {item.id === 'reports' && 'Manage reports'}
                                                    {item.id === 'analytics' && 'View analytics'}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/20">
                            <div className="text-center">
                                <div className="text-sm text-gray-500">LEWS Admin v1.0</div>
                                <div className="text-xs text-gray-400 mt-1">Secure Dashboard</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-80' : 'ml-0'}`}>
                    <div className="p-6 lg:p-8">
                        {/* Header */}
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-800">
                                        {menuItems.find(item => item.id === activeTab)?.label}
                                    </h1>
                                    <p className="text-gray-600 mt-1">
                                        {activeTab === 'summary' && 'Overview of all sensors in the system'}
                                        {activeTab === 'add-sensor' && 'Add new sensors to the monitoring network'}
                                        {activeTab === 'reports' && 'Review and manage community reports'}
                                        {activeTab === 'analytics' && 'Detailed analytics and insights'}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-gray-600">System Online</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </div>
                </div>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-black/50 z-30"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
