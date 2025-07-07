'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaEdit,
    FaTrash,
    FaMapMarkerAlt,
    FaThermometerHalf,
    FaTint,
    FaArrowsAltH,
    FaSave,
    FaTimes,
    FaExclamationTriangle
} from 'react-icons/fa';
import { Sensor } from '@/types';
import { useSensors } from '@/hooks/useSensors';

const SensorManagement = () => {
    const { sensors, loading, error, updateSensor, deleteSensor } = useSensors();
    const [editingSensor, setEditingSensor] = useState<Sensor | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Sensor>>({});

    const handleEdit = (sensor: Sensor) => {
        setEditingSensor(sensor);
        setFormData(sensor);
    };

    const handleSave = async () => {
        if (!editingSensor) return;

        try {
            await updateSensor(editingSensor.id, formData);
            setEditingSensor(null);
            setFormData({});
        } catch (err) {
            console.error('Failed to update sensor:', err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteSensor(id);
            setShowDeleteModal(null);
        } catch (err) {
            console.error('Failed to delete sensor:', err);
        }
    };

    const handleCancel = () => {
        setEditingSensor(null);
        setFormData({});
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Normal': return 'text-green-600 bg-green-100';
            case 'Siaga': return 'text-yellow-600 bg-yellow-100';
            case 'Bahaya': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="glass-intense p-6 rounded-xl bg-red-50 border border-red-200">
                <p className="text-red-600">Error loading sensors: {error.message}</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Sensor Management</h2>
                <p className="text-gray-600">{sensors.length} sensors registered</p>
            </div>

            <div className="grid gap-6">
                {sensors.map((sensor) => (
                    <motion.div
                        key={sensor.id}
                        className="glass-intense rounded-xl p-6 bg-white/50 border border-white/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        layout
                    >
                        {editingSensor?.id === sensor.id ? (
                            // Edit Mode
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input
                                            type="text"
                                            value={formData.name || ''}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <input
                                            type="text"
                                            value={formData.location || ''}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                                        <input
                                            type="number"
                                            step="any"
                                            value={formData.latitude || ''}
                                            onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                                        <input
                                            type="number"
                                            step="any"
                                            value={formData.longitude || ''}
                                            onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                                    <motion.button
                                        onClick={handleCancel}
                                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <FaTimes className="text-sm" />
                                        <span>Cancel</span>
                                    </motion.button>
                                    <motion.button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <FaSave className="text-sm" />
                                        <span>Save</span>
                                    </motion.button>
                                </div>
                            </div>
                        ) : (
                            // View Mode
                            <div>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-xl font-bold text-gray-800">{sensor.name}</h3>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(sensor.status)}`}>
                                                {sensor.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-600 text-sm mb-3">
                                            <FaMapMarkerAlt className="mr-2" />
                                            <span>{sensor.location}</span>
                                            <span className="ml-4 text-xs">({sensor.latitude}, {sensor.longitude})</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <motion.button
                                            onClick={() => handleEdit(sensor)}
                                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            title="Edit sensor"
                                        >
                                            <FaEdit />
                                        </motion.button>
                                        <motion.button
                                            onClick={() => setShowDeleteModal(sensor.id)}
                                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            title="Delete sensor"
                                        >
                                            <FaTrash />
                                        </motion.button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <FaThermometerHalf className="text-red-600" />
                                            <span className="text-sm font-medium text-gray-700">Temperature</span>
                                        </div>
                                        <p className="text-lg font-bold text-red-600">{sensor.temperature}°C</p>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <FaTint className="text-blue-600" />
                                            <span className="text-sm font-medium text-gray-700">Moisture</span>
                                        </div>
                                        <p className="text-lg font-bold text-blue-600">{sensor.moisture}%</p>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <FaArrowsAltH className="text-purple-600" />
                                            <span className="text-sm font-medium text-gray-700">Movement</span>
                                        </div>
                                        <p className="text-lg font-bold text-purple-600">{sensor.movement}mm</p>
                                    </div>
                                </div>

                                <div className="mt-3 text-xs text-gray-500">
                                    Last updated: {new Date(sensor.lastUpdate).toLocaleString()}
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteModal && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex h-screen space-y-0 items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-xl p-6 max-w-md w-full"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <FaExclamationTriangle className="text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Delete Sensor</h3>
                                    <p className="text-gray-600">This action cannot be undone</p>
                                </div>
                            </div>

                            <p className="text-gray-700 mb-6">
                                Are you sure you want to delete this sensor? All associated data will be permanently removed.
                            </p>

                            <div className="flex items-center justify-end space-x-3">
                                <button
                                    onClick={() => setShowDeleteModal(null)}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(showDeleteModal)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SensorManagement;
