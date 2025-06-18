import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const ReportSuccess: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-success-50 border border-success-200 rounded-lg p-4 mb-6"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <FaCheckCircle className="h-5 w-5 text-success-500" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-success-800">Report submitted successfully</h3>
          <div className="mt-2 text-sm text-success-700">
            <p>
              Thank you for your report. Your information helps us monitor landslide risks effectively.
              Authorities have been notified and will review your report shortly.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportSuccess;
