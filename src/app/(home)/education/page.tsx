'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaBookOpen, FaExclamationTriangle, FaShieldAlt } from 'react-icons/fa';
import { EducationContent } from '@/types';
import Loading from '@/components/common/Loading';
import { useFetchArticles } from '@/hooks/useFetchArticles';

export default function EducationPage() {
    const { articles, loading } = useFetchArticles();
    const [selectedArticle, setSelectedArticle] = useState<EducationContent | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const categories = [
        { id: 'all', label: 'All Topics', icon: FaBookOpen, color: 'blue' },
        { id: 'awareness', label: 'Awareness', icon: FaExclamationTriangle, color: 'yellow' },
        { id: 'safety', label: 'Safety', icon: FaShieldAlt, color: 'green' }
    ];

    const filteredArticles = activeCategory === 'all'
        ? articles
        : articles.filter(article => article.category === activeCategory);

    if (loading) {
        return <Loading fullScreen />;
    }

    return (
        <div className='pt-8'>
            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Landslide Education Center
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Learn about landslide prevention, safety measures, and emergency procedures to protect yourself and your community.
                    </p>
                </motion.div>

                {/* Categories */}
                <motion.div
                    className="flex flex-wrap justify-center gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {categories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                            <motion.button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${activeCategory === category.id
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <IconComponent className="text-lg" />
                                <span className="font-medium">{category.label}</span>
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Articles Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {filteredArticles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedArticle(article)}
                        >
                            <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                <FaBookOpen className="text-white text-4xl" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {article.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {article.summary}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {article.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Article Modal */}
                {selectedArticle && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setSelectedArticle(null)}
                    >
                        <motion.div
                            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <h2 className="text-3xl font-bold text-gray-800">
                                        {selectedArticle.title}
                                    </h2>
                                    <button
                                        onClick={() => setSelectedArticle(null)}
                                        className="text-gray-500 hover:text-gray-700 text-2xl"
                                    >
                                        ×
                                    </button>
                                </div>
                                <div
                                    className="prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                                />
                                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200">
                                    {selectedArticle.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
