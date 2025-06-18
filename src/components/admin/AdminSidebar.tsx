import { motion } from 'framer-motion';
import { FaPlus, FaChartBar, FaFileAlt } from 'react-icons/fa';

interface MenuItem {
    id: 'summary' | 'add-sensor' | 'reports' | 'analytics';
    label: string;
    icon: React.ComponentType<any>;
    color: string;
}

interface AdminSidebarProps {
    activeTab: 'summary' | 'add-sensor' | 'reports' | 'analytics';
    setActiveTab: (tab: 'summary' | 'add-sensor' | 'reports' | 'analytics') => void;
    sidebarOpen: boolean;
    sensorsCount: number;
}

const AdminSidebar = ({ activeTab, setActiveTab, sidebarOpen, sensorsCount }: AdminSidebarProps) => {
    const menuItems: MenuItem[] = [
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

    return (
        <motion.div
            className={`fixed left-0 top-0 h-full z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0`}
            initial={{ x: -300 }}
            animate={{ x: sidebarOpen ? 0 : -300 }}
            transition={{ type: 'spring', stiffness: 50 }}
        >
            <div className="w-80 h-full glass-intense backdrop-blur-xl border-r border-white/20 shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-white/20">
                    <h1 className="text-2xl font-bold">
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
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${isActive
                                    ? 'bg-gradient-to-r text-white shadow-lg scale-105'
                                    : 'hover:bg-white/50 hover:scale-102'
                                    }`}
                                style={
                                    isActive
                                        ? {
                                            backgroundImage: `linear-gradient(to right, ${item.color.split(' ')[0]}, ${item.color.split(' ')[2]
                                                })`
                                        }
                                        : {}
                                }
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${item.color}`}>
                                        <IconComponent className="text-white" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-800">
                                            {item.label}
                                        </div>
                                        <div className="text-sm text-gray-800">
                                            {item.id === 'summary' && `${sensorsCount} sensors`}
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
    );
};

export default AdminSidebar;
