import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaCheck, FaTimes, FaClock, FaMapMarkerAlt, FaImage, FaFilter } from 'react-icons/fa';
import { Report } from '../../types';

const AdminReports = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [filter, setFilter] = useState<'all' | 'Pending' | 'Verified' | 'Resolved'>('all');
    const [loading, setLoading] = useState(true);

    // Mock data - in real app, this would come from an API
    useEffect(() => {
        const mockReports: Report[] = [
            {
                id: 'report_1',
                name: 'Ahmad Rizky',
                location: 'Jl. Raya Padang No. 123',
                latitude: -0.9471,
                longitude: 100.4172,
                description: 'Terlihat retakan di tanah dan beberapa pohon mulai miring. Ada suara gemuruh dari arah bukit.',
                imageUrl: 'https://via.placeholder.com/400x300',
                status: 'Pending',
                createdAt: '2025-06-18T10:30:00Z'
            },
            {
                id: 'report_2',
                name: 'Siti Nurhaliza',
                location: 'Kampung Baru, Bukittinggi',
                latitude: -0.3037,
                longitude: 100.3700,
                description: 'Air sumber mata air menjadi keruh dan volume berkurang drastis sejak 2 hari yang lalu.',
                status: 'Verified',
                createdAt: '2025-06-17T15:45:00Z'
            },
            {
                id: 'report_3',
                name: 'Budi Santoso',
                location: 'Desa Koto Baru',
                latitude: -0.7893,
                longitude: 100.6505,
                description: 'Jalan mulai retak dan ada pergerakan tanah di sekitar area perumahan.',
                status: 'Resolved',
                createdAt: '2025-06-16T08:20:00Z'
            }
        ];

        setTimeout(() => {
            setReports(mockReports);
            setLoading(false);
        }, 1000);
    }, []);

    const handleStatusChange = (reportId: string, newStatus: Report['status']) => {
        setReports(prev => prev.map(report =>
            report.id === reportId ? { ...report, status: newStatus } : report
        ));
    };

    const filteredReports = filter === 'all'
        ? reports
        : reports.filter(report => report.status === filter);

    const getStatusColor = (status: Report['status']) => {
        switch (status) {
            case 'Pending': return 'text-yellow-600 bg-yellow-100';
            case 'Verified': return 'text-blue-600 bg-blue-100';
            case 'Resolved': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status: Report['status']) => {
        switch (status) {
            case 'Pending': return FaClock;
            case 'Verified': return FaEye;
            case 'Resolved': return FaCheck;
            default: return FaClock;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="glass-intense p-8 rounded-2xl">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading reports...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header with Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Community Reports</h2>
                    <p className="text-gray-600">Review and manage reports from the community</p>
                </div>

                <div className="flex items-center space-x-2">
                    <FaFilter className="text-gray-500" />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as any)}
                        className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Reports ({reports.length})</option>
                        <option value="Pending">Pending ({reports.filter(r => r.status === 'Pending').length})</option>
                        <option value="Verified">Verified ({reports.filter(r => r.status === 'Verified').length})</option>
                        <option value="Resolved">Resolved ({reports.filter(r => r.status === 'Resolved').length})</option>
                    </select>
                </div>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredReports.map((report, index) => {
                    const StatusIcon = getStatusIcon(report.status);
                    return (
                        <motion.div
                            key={report.id}
                            className="glass-intense rounded-2xl p-6 bg-white/50 border border-white/20 hover:shadow-lg transition-all cursor-pointer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            onClick={() => setSelectedReport(report)}
                        >
                            {/* Status Badge */}
                            <div className="flex items-center justify-between mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                                    <StatusIcon className="inline mr-1" />
                                    {report.status}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {new Date(report.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            {/* Reporter Info */}
                            <div className="mb-4">
                                <h3 className="font-semibold text-gray-800 mb-1">{report.name}</h3>
                                <div className="flex items-center text-sm text-gray-600">
                                    <FaMapMarkerAlt className="mr-1" />
                                    {report.location}
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {report.description}
                            </p>

                            {/* Image Indicator */}
                            {report.imageUrl && (
                                <div className="flex items-center text-sm text-blue-600 mb-4">
                                    <FaImage className="mr-1" />
                                    Image attached
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex space-x-2">
                                {report.status === 'Pending' && (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleStatusChange(report.id, 'Verified');
                                            }}
                                            className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                                        >
                                            Verify
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleStatusChange(report.id, 'Resolved');
                                            }}
                                            className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                                        >
                                            Resolve
                                        </button>
                                    </>
                                )}
                                {report.status === 'Verified' && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleStatusChange(report.id, 'Resolved');
                                        }}
                                        className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                                    >
                                        Mark Resolved
                                    </button>
                                )}
                                {report.status === 'Resolved' && (
                                    <div className="flex-1 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium text-center">
                                        <FaCheck className="inline mr-1" />
                                        Completed
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Empty State */}
            {filteredReports.length === 0 && (
                <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="glass-intense rounded-2xl p-8 max-w-md mx-auto">
                        <FaEye className="text-4xl text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Reports Found</h3>
                        <p className="text-gray-500">No reports match your current filter criteria.</p>
                    </div>
                </motion.div>
            )}

            {/* Report Detail Modal */}
            {selectedReport && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setSelectedReport(null)}
                >
                    <motion.div
                        className="glass-intense rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Report Details</h2>
                            <button
                                onClick={() => setSelectedReport(null)}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Status and Date */}
                            <div className="flex items-center justify-between">
                                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedReport.status)}`}>
                                    {selectedReport.status}
                                </span>
                                <span className="text-gray-500">
                                    {new Date(selectedReport.createdAt).toLocaleString()}
                                </span>
                            </div>

                            {/* Reporter Information */}
                            <div className="glass-intense bg-gray-50 rounded-xl p-4">
                                <h3 className="font-semibold text-gray-800 mb-2">Reporter Information</h3>
                                <div className="space-y-1">
                                    <div><strong>Name:</strong> {selectedReport.name}</div>
                                    <div><strong>Location:</strong> {selectedReport.location}</div>
                                    {selectedReport.latitude && selectedReport.longitude && (
                                        <div><strong>Coordinates:</strong> {selectedReport.latitude}, {selectedReport.longitude}</div>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                                <p className="text-gray-600 leading-relaxed">{selectedReport.description}</p>
                            </div>

                            {/* Image */}
                            {selectedReport.imageUrl && (
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">Attached Image</h3>
                                    <img
                                        src={selectedReport.imageUrl}
                                        alt="Report"
                                        className="w-full rounded-xl border border-gray-200"
                                    />
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex space-x-3 pt-4 border-t border-gray-200">
                                {selectedReport.status === 'Pending' && (
                                    <>
                                        <button
                                            onClick={() => {
                                                handleStatusChange(selectedReport.id, 'Verified');
                                                setSelectedReport(null);
                                            }}
                                            className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                                        >
                                            Verify Report
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleStatusChange(selectedReport.id, 'Resolved');
                                                setSelectedReport(null);
                                            }}
                                            className="flex-1 px-4 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                                        >
                                            Mark as Resolved
                                        </button>
                                    </>
                                )}
                                {selectedReport.status === 'Verified' && (
                                    <button
                                        onClick={() => {
                                            handleStatusChange(selectedReport.id, 'Resolved');
                                            setSelectedReport(null);
                                        }}
                                        className="flex-1 px-4 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                                    >
                                        Mark as Resolved
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default AdminReports;
