import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaTimes, FaBars } from 'react-icons/fa';
import { useSensors } from '@/hooks/useSensors';
import AdminSensorSummary from '@/components/admin/AdminSensorSummary';
import AddSensorForm from '@/components/admin/AddSensorForm';
import AdminReports from '@/components/admin/AdminReports';
import SensorAnalytics from '@/components/admin/SensorAnalytics';
import AdminSidebar from '@/components/admin/AdminSidebar';
import Loading from '@/components/common/Loading';

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

    const getTabInfo = () => {
        const tabInfo = {
            'summary': {
                title: 'Sensor Summary',
                description: 'Overview of all sensors in the system'
            },
            'add-sensor': {
                title: 'Add Sensors',
                description: 'Add new sensors to the monitoring network'
            },
            'reports': {
                title: 'Check Reports',
                description: 'Review and manage community reports'
            },
            'analytics': {
                title: 'Sensor Analytics',
                description: 'Detailed analytics and insights'
            }
        };
        return tabInfo[activeTab];
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
                <AdminSidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    sidebarOpen={sidebarOpen}
                    sensorsCount={sensors.length}
                />

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
                                        {getTabInfo().title}
                                    </h1>
                                    <p className="text-gray-600 mt-1">
                                        {getTabInfo().description}
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
