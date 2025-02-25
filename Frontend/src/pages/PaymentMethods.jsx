import React from 'react';
import {
  FaCreditCard,
  FaChevronLeft,
  FaPaypal,
  FaApplePay,
  FaGooglePay,
  FaBitcoin,
  FaHistory,
  FaWallet
} from 'react-icons/fa';
import { SiVisa, SiMastercard, SiStripe } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentMethods = ({ onClose, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className='fixed inset-0 h-full bg-gray-900/95 backdrop-blur-lg p-6 flex flex-col overflow-hidden z-50'
        >
          {/* Back Button */}
          <button
            onClick={onClose}
            className='absolute top-6 left-6 text-gray-300 transition-colors bg-gray-800/50 rounded-full p-3 hover:bg-gray-700/70'
          >
            <FaChevronLeft className='text-xl' />
          </button>

          {/* Header */}
          <h2 className='text-4xl font-bold text-white mb-8 text-center'>Payment Methods</h2>

          {/* Main Content */}
          <div className='flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto'>
            {/* Left Column */}
            <div className='space-y-6'>
              {/* Add Payment Method Section */}
              <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
                <h3 className='text-xl font-semibold text-white mb-4'>Add Payment Method</h3>
                <input
                  type='text'
                  placeholder='Card Number'
                  className='w-full bg-gray-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4'
                />
                <div className='grid grid-cols-2 gap-4 mb-4'>
                  <input
                    type='text'
                    placeholder='Expiry Date'
                    className='w-full bg-gray-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                  <input
                    type='text'
                    placeholder='CVV'
                    className='w-full bg-gray-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <button className='w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors'>
                  Add Card
                </button>
              </div>

              {/* Saved Payment Methods */}
              <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
                <h3 className='text-xl font-semibold text-white mb-4'>Saved Payment Methods</h3>
                <div className='space-y-4'>
                  {/* Card 1 */}
                  <div className='flex items-center justify-between bg-gray-700/50 rounded-lg p-4'>
                    <div className='flex items-center space-x-4'>
                      <FaCreditCard className='text-2xl text-blue-500' />
                      <div>
                        <p className='text-white font-semibold'>Visa ending in 1234</p>
                        <p className='text-gray-400 text-sm'>Expires 12/25</p>
                      </div>
                    </div>
                    <button className='text-gray-300 hover:text-white transition-colors'>
                      Edit
                    </button>
                  </div>

                  {/* Card 2 */}
                  <div className='flex items-center justify-between bg-gray-700/50 rounded-lg p-4'>
                    <div className='flex items-center space-x-4'>
                      <FaCreditCard className='text-2xl text-purple-500' />
                      <div>
                        <p className='text-white font-semibold'>Mastercard ending in 5678</p>
                        <p className='text-gray-400 text-sm'>Expires 10/24</p>
                      </div>
                    </div>
                    <button className='text-gray-300 hover:text-white transition-colors'>
                      Edit
                    </button>
                  </div>
                </div>
              </div>

              {/* Payment History */}
              <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
                <h3 className='text-xl font-semibold text-white mb-4 flex items-center space-x-2'>
                  <FaHistory className='text-2xl text-yellow-500' />
                  <span>Payment History</span>
                </h3>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between bg-gray-700/50 rounded-lg p-4'>
                    <div>
                      <p className='text-white font-semibold'>Netflix Subscription</p>
                      <p className='text-gray-400 text-sm'>12 Oct 2023</p>
                    </div>
                    <p className='text-red-500 font-semibold'>-$15.99</p>
                  </div>
                  <div className='flex items-center justify-between bg-gray-700/50 rounded-lg p-4'>
                    <div>
                      <p className='text-white font-semibold'>Spotify Subscription</p>
                      <p className='text-gray-400 text-sm'>10 Oct 2023</p>
                    </div>
                    <p className='text-red-500 font-semibold'>-$9.99</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className='space-y-6'>
              {/* Balance Overview */}
              <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
                <h3 className='text-xl font-semibold text-white mb-4 flex items-center space-x-2'>
                  <FaWallet className='text-2xl text-green-500' />
                  <span>Balance Overview</span>
                </h3>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <p className='text-gray-400'>Total Balance</p>
                    <p className='text-white font-semibold'>$1,250.00</p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className='text-gray-400'>Available Credit</p>
                    <p className='text-white font-semibold'>$5,000.00</p>
                  </div>
                </div>
              </div>

              {/* Other Payment Options */}
              <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
                <h3 className='text-xl font-semibold text-white mb-4'>Other Payment Options</h3>
                <div className='grid grid-cols-2 gap-4'>
                  {/* PayPal */}
                  <button className='flex items-center justify-center space-x-2 bg-gray-700/50 rounded-lg p-4 hover:bg-gray-600/70 transition-colors'>
                    <FaPaypal className='text-2xl text-blue-500' />
                    <span className='text-white'>PayPal</span>
                  </button>

                  {/* Apple Pay */}
                  <button className='flex items-center justify-center space-x-2 bg-gray-700/50 rounded-lg p-4 hover:bg-gray-600/70 transition-colors'>
                    <FaApplePay className='text-2xl text-gray-100' />
                    <span className='text-white'>Apple Pay</span>
                  </button>

                  {/* Google Pay */}
                  <button className='flex items-center justify-center space-x-2 bg-gray-700/50 rounded-lg p-4 hover:bg-gray-600/70 transition-colors'>
                    <FaGooglePay className='text-2xl text-green-500' />
                    <span className='text-white'>Google Pay</span>
                  </button>

                  {/* Bitcoin */}
                  <button className='flex items-center justify-center space-x-2 bg-gray-700/50 rounded-lg p-4 hover:bg-gray-600/70 transition-colors'>
                    <FaBitcoin className='text-2xl text-orange-500' />
                    <span className='text-white'>Bitcoin</span>
                  </button>
                </div>
              </div>

              {/* Promotional Banner */}
              <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6'>
                <h3 className='text-xl font-semibold text-white mb-4'>Get 10% Cashback!</h3>
                <p className='text-gray-200 mb-4'>
                  Use code <span className='font-bold'>PAY10</span> for instant cashback on your
                  next payment.
                </p>
                <button className='w-full bg-white text-blue-600 p-3 rounded-lg hover:bg-gray-100 transition-colors'>
                  Apply Code
                </button>
              </div>

              {/* Supported Payment Icons */}
              <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
                <h3 className='text-xl font-semibold text-white mb-4'>Supported Payment Methods</h3>
                <div className='flex items-center justify-around'>
                  <SiVisa className='text-4xl text-blue-500' />
                  <SiMastercard className='text-4xl text-red-500' />
                  <SiStripe className='text-4xl text-purple-500' />
                  <FaPaypal className='text-4xl text-blue-500' />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentMethods;
