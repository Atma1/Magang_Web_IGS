import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaMapMarkedAlt, FaClipboardList, FaBookOpen, FaBell, FaMagic } from 'react-icons/fa';

const QuickActions: React.FC = () => {
  const actions = [
    {
      title: 'View Map',
      description: 'See all sensor locations on map',
      icon: <FaMapMarkedAlt size={32} />,
      link: '/map',
      gradient: 'bg-gradient-to-br from-blue-400 to-purple-500',
      hoverGradient: 'hover:from-purple-500 hover:to-blue-400',
    },
    {
      title: 'Submit Report',
      description: 'Report a landslide or concern',
      icon: <FaClipboardList size={32} />,
      link: '/reports',
      gradient: 'bg-gradient-to-br from-emerald-400 to-cyan-500',
      hoverGradient: 'hover:from-cyan-500 hover:to-emerald-400',
    },
    {
      title: 'Learning Resources',
      description: 'Landslide education materials',
      icon: <FaBookOpen size={32} />,
      link: '/education',
      gradient: 'bg-gradient-to-br from-yellow-400 to-orange-500',
      hoverGradient: 'hover:from-orange-500 hover:to-yellow-400',
    },
  ];

  return (
    <div>
      <motion.div 
        className="flex items-center justify-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <FaMagic className="text-purple-500 text-3xl mr-4" />
        <h2 className="text-4xl font-bold text-white text-shadow">Quick Actions</h2>
        <FaMagic className="text-purple-500 text-3xl ml-4" />
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link href={action.link} className="block h-full">
              <motion.div 
                className={`${action.gradient} ${action.hoverGradient} rounded-2xl p-8 h-full shadow-xl hover:shadow-2xl transition-all duration-300 group`}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-white text-center">
                  <motion.div 
                    className="mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {action.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3">{action.title}</h3>
                  <p className="text-white/90">{action.description}</p>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
