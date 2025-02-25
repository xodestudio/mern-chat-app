import React from 'react';
import { FaCreditCard, FaChevronLeft } from 'react-icons/fa';

const PaymentMethods = ({ onClose }) => {
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
      <h2 className='text-4xl font-bold text-white mb-8 text-center'>Payment Methods</h2>

      {/* Payment Options */}
      <div className='space-y-6'>
        <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
          <h3 className='text-xl font-semibold text-white mb-4'>Add Payment Method</h3>
          <input
            type='text'
            placeholder='Card Number'
            className='w-full bg-gray-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4'
          />
          <button className='w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300'>
            Add Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
