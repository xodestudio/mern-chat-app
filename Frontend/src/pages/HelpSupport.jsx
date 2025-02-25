import React from 'react';
import { FaInfoCircle, FaChevronLeft } from 'react-icons/fa';

const HelpSupport = ({ onClose }) => {
  return (
    <div className='h-full w-full bg-gray-900/95 backdrop-blur-lg p-6 overflow-y-auto animate-slideInFromRight'>
      {/* Back Button */}
      <button
        onClick={onClose}
        className='absolute top-6 left-6 text-gray-300 hover:text-white transition-colors bg-gray-800/50 rounded-full p-3'
      >
        <FaChevronLeft className='text-xl' />
      </button>

      {/* Header */}
      <h2 className='text-4xl font-bold text-white mb-8 text-center'>Help & Support</h2>

      {/* Help Options */}
      <div className='space-y-6'>
        <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
          <h3 className='text-xl font-semibold text-white mb-4'>Contact Support</h3>
          <p className='text-gray-300 mb-4'>Need help? Reach out to our support team.</p>
          <button className='w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300'>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
