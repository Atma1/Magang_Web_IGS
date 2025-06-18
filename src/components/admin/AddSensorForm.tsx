import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import { Sensor } from '../../types';

const AddSensorForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        latitude: '',
        longitude: '',
        temperature: '',
        moisture: '',
        movement: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Create new sensor object
        const newSensor: Partial<Sensor> = {
            id: `sensor_${Date.now()}`,
            name: formData.name,
            location: formData.location,
            latitude: parseFloat(formData.latitude),
            longitude: parseFloat(formData.longitude),
            status: 'Normal',
            temperature: parseFloat(formData.temperature) || 25,
            moisture: parseFloat(formData.moisture) || 60,
            movement: parseFloat(formData.movement) || 0,
            lastUpdate: new Date().toISOString(),
            history: []
        };

        console.log('New sensor created:', newSensor);

        setIsSubmitting(false);
        setShowSuccess(true);

        // Reset form
        setFormData({
            name: '',
            location: '',
            latitude: '',
            longitude: '',
            temperature: '',
            moisture: '',
            movement: ''
        });

        // Hide success message after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            location: '',
            latitude: '',
            longitude: '',
            temperature: '',
            moisture: '',
            movement: ''
        });
    };

    return (
        <div className="max-w-4xl">
            {/* Success Message */}
            {showSuccess && (
                <motion.div
                    className="mb-6 glass-intense bg-green-50 border border-green-200 rounded-2xl p-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <FaPlus className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-green-800">Sensor Added Successfully!</h3>
                            <p className="text-green-600 text-sm">The new sensor has been added to the monitoring network.</p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Form */}
            <motion.div
                className="glass-intense rounded-2xl p-8 bg-white/50 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <FaPlus className="text-white text-xl" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Add New Sensor</h2>
                        <p className="text-gray-600">Configure a new sensor for the monitoring network</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Sensor Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sensor Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                placeholder="e.g., Sensor Bukit Tinggi A1"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location *
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                placeholder="e.g., Bukit Tinggi, Padang"
                            />
                        </div>

                        {/* Latitude */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Latitude *
                            </label>
                            <input
                                type="number"
                                step="any"
                                name="latitude"
                                value={formData.latitude}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                placeholder="e.g., -0.7893"
                            />
                        </div>

                        {/* Longitude */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Longitude *
                            </label>
                            <input
                                type="number"
                                step="any"
                                name="longitude"
                                value={formData.longitude}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                placeholder="e.g., 100.6505"
                            />
                        </div>

                        {/* Initial Temperature */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Initial Temperature (°C)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="temperature"
                                value={formData.temperature}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                placeholder="e.g., 25.5"
                            />
                        </div>

                        {/* Initial Moisture */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Initial Moisture (%)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="moisture"
                                value={formData.moisture}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                placeholder="e.g., 60.5"
                            />
                        </div>

                        {/* Initial Movement */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Initial Movement (mm)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                name="movement"
                                value={formData.movement}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                placeholder="e.g., 0.00"
                            />
                        </div>
                    </div>

                    {/* Location Preview */}
                    {formData.latitude && formData.longitude && (
                        <motion.div
                            className="glass-intense bg-blue-50 border border-blue-200 rounded-xl p-4"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                        >
                            <div className="flex items-center space-x-2 text-blue-800">
                                <FaMapMarkerAlt />
                                <span className="font-medium">Location Preview:</span>
                                <span>{formData.latitude}, {formData.longitude}</span>
                            </div>
                        </motion.div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                        <motion.button
                            type="button"
                            onClick={resetForm}
                            className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FaTimes />
                            <span>Reset</span>
                        </motion.button>

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FaSave />
                            <span>{isSubmitting ? 'Adding Sensor...' : 'Add Sensor'}</span>
                        </motion.button>
                    </div>
                </form>
            </motion.div>

            {/* Guidelines */}
            <motion.div
                className="mt-8 glass-intense rounded-2xl p-6 bg-gray-50 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Sensor Installation Guidelines</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                        <h4 className="font-medium text-gray-800 mb-2">Location Requirements:</h4>
                        <ul className="space-y-1 list-disc list-inside">
                            <li>Choose areas prone to landslides</li>
                            <li>Ensure stable mounting surface</li>
                            <li>Consider accessibility for maintenance</li>
                            <li>Avoid areas with excessive vegetation</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-800 mb-2">Technical Considerations:</h4>
                        <ul className="space-y-1 list-disc list-inside">
                            <li>Verify GPS coordinates accuracy</li>
                            <li>Ensure power source availability</li>
                            <li>Check cellular/WiFi connectivity</li>
                            <li>Test sensor readings before deployment</li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AddSensorForm;
