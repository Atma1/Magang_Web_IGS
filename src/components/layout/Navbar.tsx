import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaTimes, 
  FaBell, 
  FaChartLine, 
  FaMapMarkedAlt, 
  FaClipboardList, 
  FaGraduationCap,
  FaShieldAlt,
  FaHome
} from 'react-icons/fa';

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  
  const navLinks = [
    { title: 'Dashboard', path: '/', icon: FaHome, color: 'text-blue-600' },
    { title: 'Map', path: '/map', icon: FaMapMarkedAlt, color: 'text-green-600' },
    { title: 'Reports', path: '/reports', icon: FaClipboardList, color: 'text-orange-600' },
    { title: 'Education', path: '/education', icon: FaGraduationCap, color: 'text-purple-600' },
  ];
  
  const isActive = (path: string) => router.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled 
          ? 'glass-intense backdrop-blur-md shadow-xl' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between h-20 items-center">
          {/* Logo dengan Efek Rainbow */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center group">
              <motion.div
                className="relative w-14 h-14 mr-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center rainbow-shimmer">
                  <FaShieldAlt className="text-white text-2xl" />
                </div>
              </motion.div>
              <div>
                <motion.h1 
                  className="text-3xl font-bold text-gradient-rainbow"
                  whileHover={{ scale: 1.05 }}
                >
                  LEWS
                </motion.h1>
                <div className="text-xs text-gray-500 font-medium -mt-1">Early Warning System</div>
              </div>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation dengan Warna-warni */}
          <div className="hidden lg:flex items-center space-x-3">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Link href={link.path}>
                  <motion.div
                    className={`relative px-6 py-3 rounded-2xl transition-all duration-300 group ${
                      isActive(link.path)
                        ? 'glass-card text-gray-700 shadow-lg'
                        : 'text-gray-600 hover:text-gray-800 hover:glass-card'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center space-x-3">
                      <link.icon className={`w-5 h-5 ${link.color}`} />
                      <span className="font-medium">{link.title}</span>
                    </div>
                    {isActive(link.path) && (
                      <motion.div
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notification Button dengan Efek Neon */}
            <motion.button 
              className="relative p-4 rounded-2xl glass-card hover:neon-blue transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaBell className="w-5 h-5 text-blue-600" />
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span className="text-white text-xs font-bold">3</span>
              </motion.div>
            </motion.button>
            
            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-4 rounded-2xl glass-card"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes className="w-5 h-5 text-red-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars className="w-5 h-5 text-blue-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu dengan Animasi Smooth */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="glass-intense mx-4 my-4 rounded-3xl overflow-hidden shadow-2xl">
              <div className="py-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={link.path} onClick={() => setIsOpen(false)}>
                      <motion.div 
                        className={`flex items-center space-x-4 px-8 py-4 transition-all duration-300 ${
                          isActive(link.path)
                            ? 'bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-r-4 border-gradient-to-b from-blue-400 to-purple-500'
                            : 'hover:bg-gradient-to-r hover:from-blue-25 hover:to-purple-25'
                        }`}
                        whileHover={{ scale: 1.02, x: 10 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <link.icon className={`w-6 h-6 ${
                          isActive(link.path) ? link.color : 'text-gray-500'
                        }`} />
                        <span className={`font-medium text-lg ${
                          isActive(link.path) ? 'text-gray-800' : 'text-gray-600'
                        }`}>
                          {link.title}
                        </span>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
