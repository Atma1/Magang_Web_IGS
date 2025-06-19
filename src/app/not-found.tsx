'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, MapPin } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* Animated 404 */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        404
                    </h1>
                    <div className="relative">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                        >
                            <MapPin className="w-8 h-8 text-red-500" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Error Message */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-gray-600 mb-2">
                        Oops! It looks like this page has slipped away like a landslide.
                    </p>
                    <p className="text-gray-500">
                        The page you're looking for doesn't exist or may have been moved.
                    </p>
                </motion.div>

                {/* Illustration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-12"
                >
                    <div className="relative w-64 h-48 mx-auto">
                        {/* Mountain illustration */}
                        <svg viewBox="0 0 200 120" className="w-full h-full">
                            <defs>
                                <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#3B82F6" />
                                    <stop offset="100%" stopColor="#8B5CF6" />
                                </linearGradient>
                            </defs>

                            {/* Mountains */}
                            <polygon
                                points="20,100 60,40 100,100"
                                fill="url(#mountainGradient)"
                                opacity="0.8"
                            />
                            <polygon
                                points="80,100 120,30 160,100"
                                fill="url(#mountainGradient)"
                                opacity="0.6"
                            />
                            <polygon
                                points="140,100 180,50 200,100"
                                fill="url(#mountainGradient)"
                                opacity="0.4"
                            />
                        </svg>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            <Home className="w-5 h-5" />
                            Go Home
                        </motion.button>
                    </Link>

                    <Link href="/education">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-200"
                        >
                            <Search className="w-5 h-5" />
                            Explore Education
                        </motion.button>
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>
                </motion.div>

                {/* Additional Help */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Need Help?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <Link
                            href="/"
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            🏠 Dashboard Home
                        </Link>
                        <Link
                            href="/education"
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            📚 Educational Content
                        </Link>
                    </div>
                </motion.div>

                {/* Fun fact */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="mt-8 text-sm text-gray-500"
                >
                    💡 Fun fact: Real landslide monitoring helps prevent disasters by detecting ground movement early!
                </motion.div>
            </div>
        </div>
    );
}