'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SensorStatusCard from '@/components/dashboard/SensorStatusCard';
import SensorChart from '@/components/dashboard/SensorChart';
import QuickActions from '@/components/dashboard/QuickActions';
import { useSensors } from '@/hooks/useSensors';
import StatusSummary from '@/components/dashboard/StatusSummary';
import Loading from '@/components/common/Loading';
import {
    FaShieldAlt,
    FaChartLine,
    FaGlobe,
    FaLightbulb,
    FaHeart,
    FaStar,
    FaMagic
} from 'react-icons/fa';

export default function Dashboard() {
    const { sensors, loading, error } = useSensors();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (loading) return <Loading fullScreen />;

    if (error) return (
        <div className="min-h-screen flex items-center justify-center">
            <motion.div
                className="glass-intense p-10 rounded-3xl text-center max-w-md shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaShieldAlt className="text-white text-3xl" />
                </div>
                <h2 className="text-3xl font-bold text-gradient-rainbow mb-4">System Error</h2>
                <p className="text-gray-600">Unable to load sensor data. Please try again later.</p>
            </motion.div>
        </div>
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <>
            <div className="min-h-screen pt-28 pb-16">
                <div className='box'></div>
                {/* Hero Section dengan Gradient Rainbow */}
                <motion.div
                    className="container mx-auto px-6 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="text-center mb-12">
                        <motion.div
                            className="inline-flex items-center space-x-3 glass-intense px-6 py-3 rounded-full mb-8"
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />
                            <span className="text-sm font-medium text-gray-700">System Online & Monitoring</span>
                            <FaHeart className="text-red-400 text-sm" />
                        </motion.div>

                        <motion.h1
                            className="text-6xl md:text-8xl font-bold mb-6 leading-tight text-shadow"
                            variants={itemVariants}
                        >
                            <span className="text-gradient-rainbow">Smart Alert</span>
                            <br />

                            <span className="text-white drop-shadow-lg">Landslide EWS</span>
                        </motion.h1>

                        <motion.p
                            className="text-xl text-black max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-medium"
                            variants={itemVariants}
                        >
                            Advanced AI-powered landslide detection and early warning system with real-time monitoring,
                            beautiful visualizations, and community-driven safety initiatives ✨
                        </motion.p>

                        <motion.div
                            className="flex justify-center space-x-6 mt-8"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="flex items-center space-x-2 glass-intense px-4 py-2 rounded-full"
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaGlobe className="text-blue-500" />
                                <span className="text-sm font-medium text-gray-700">24/7 Monitoring</span>
                            </motion.div>
                            <motion.div
                                className="flex items-center space-x-2 glass-intense px-4 py-2 rounded-full"
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaLightbulb className="text-yellow-500" />
                                <span className="text-sm font-medium text-gray-700">AI Predictions</span>
                            </motion.div>
                            <motion.div
                                className="flex items-center space-x-2 glass-intense px-4 py-2 rounded-full"
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaStar className="text-purple-500" />
                                <span className="text-sm font-medium text-gray-700">Community First</span>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Status Summary dengan Efek Colorful */}
                <motion.div
                    className="container mx-auto px-6 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <StatusSummary sensors={sensors} />
                </motion.div>

                {/* Sensor Cards Grid dengan Animasi Stagger */}
                <motion.div
                    className="container mx-auto px-6 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="flex items-center justify-center mb-12"
                        variants={itemVariants}
                    >
                        <FaMagic className="text-purple-500 text-2xl mr-4" />
                        <h2 className="text-4xl font-bold text-gray-800 text-center">
                            Live Sensor Network
                        </h2>
                        <FaMagic className="text-purple-500 text-2xl ml-4" />
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                        variants={containerVariants}
                    >
                        {sensors.map((sensor, index) => (
                            <motion.div
                                key={sensor.id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                                custom={index}
                            >
                                <SensorStatusCard sensor={sensor} />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Analytics Section dengan Glass Effect */}
                <motion.div
                    className="container mx-auto px-6 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="rounded-3xl p-10"
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                    >
                        <div className="flex items-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 rounded-2xl flex items-center justify-center mr-6">
                                <FaChartLine className="text-white text-2xl" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h2>
                                <p className="text-gray-600 mt-1">Real-time data visualization and trends analysis</p>
                            </div>
                        </div>
                        <SensorChart sensors={sensors} />
                    </motion.div>
                </motion.div>

                {/* Quick Actions dengan Colorful Cards */}
                <motion.div
                    className="container mx-auto px-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <QuickActions />
                </motion.div>

                {/* Floating Background Elements dengan Warna-warni */}
                {mounted && (
                    <div className="fixed inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
                            style={{
                                background: 'radial-gradient(circle, rgba(102,126,234,0.3) 0%, transparent 70%)'
                            }}
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                        <motion.div
                            className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full opacity-20"
                            style={{
                                background: 'radial-gradient(circle, rgba(240,147,251,0.3) 0%, transparent 70%)'
                            }}
                            animate={{
                                scale: [1.2, 1, 1.2],
                                rotate: [360, 180, 0],
                            }}
                            transition={{
                                duration: 25,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                        <motion.div
                            className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-20"
                            style={{
                                background: 'radial-gradient(circle, rgba(79,172,254,0.3) 0%, transparent 70%)'
                            }}
                            animate={{
                                scale: [1, 1.3, 1],
                                rotate: [0, -180, -360],
                            }}
                            transition={{
                                duration: 30,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
