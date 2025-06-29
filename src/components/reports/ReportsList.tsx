import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Report } from '../../types';
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaClock, FaCheckDouble } from 'react-icons/fa';

const ReportsList: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/report');
        const data = await response.json();
        setReports(data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching reports:', error);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const filteredReports = filter === 'all' 
    ? reports 
    : reports.filter(report => report.status.toLowerCase() === filter);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'verified':
        return <FaCheck className="text-blue-500" />;
      case 'resolved':
        return <FaCheckDouble className="text-green-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <div className="mb-6 flex justify-between items-center flex-wrap">
        <div className="relative rounded-md shadow-sm w-full md:w-auto mb-4 md:mb-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="Search reports..."
          />
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              filter === 'all' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              filter === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('verified')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              filter === 'verified' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Verified
          </button>
          <button
            onClick={() => setFilter('resolved')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              filter === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Resolved
          </button>
        </div>
      </div>

      {filteredReports.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No reports found matching your criteria.
        </div>
      ) : (
        <div className="space-y-6">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{report.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FaMapMarkerAlt className="mr-1 text-gray-400" />
                      {report.location}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center
                    ${
                      report.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : report.status === 'Verified'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }
                  `}>
                    <span className="mr-1">{getStatusIcon(report.status)}</span>
                    {report.status}
                  </div>
                </div>
                
                <p className="mt-3 text-gray-600 text-sm">{report.description}</p>
                
                {report.imageUrl && (
                  <div className="mt-3">
                    <img
                      src={report.imageUrl}
                      alt="Report image"
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>
                )}
                
                <div className="mt-4 text-xs text-gray-500 flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  Reported on {formatDate(report.createdAt)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportsList;
