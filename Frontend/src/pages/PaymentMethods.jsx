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
import { BsCheckCircleFill, BsArrowRightShort } from 'react-icons/bs';
import { motion } from 'framer-motion';

const PaymentMethods = ({ onClose }) => {
  return (
    <div className='h-full w-full bg-gray-900/95 backdrop-blur-lg p-6 overflow-y-auto animate-slideInFromRight'>
      {/* Back Button */}
      <button
        onClick={onClose}
        className='absolute top-6 left-6 text-gray-300 hover:text-white transition-colors bg-gray-800/50 rounded-full p-3 shadow-lg'
      >
        <FaChevronLeft className='text-xl' />
      </button>

      {/* Header */}
      <h2 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-8 text-center'>
        Payment Methods
      </h2>

      {/* Payment Options */}
      <div className='space-y-8'>
        {/* Add Payment Method Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-gray-800/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg'
        >
          <h3 className='text-2xl font-semibold text-white flex items-center gap-3 mb-4'>
            <FaCreditCard className='text-blue-500 text-2xl' /> Add Payment Method
          </h3>
          <p className='text-gray-300 mb-4'>Add a new payment method to your account.</p>
          <input
            type='text'
            placeholder='Card Number'
            className='w-full bg-gray-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-4'
          />
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <input
              type='text'
              placeholder='Expiry Date (MM/YY)'
              className='w-full bg-gray-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
            />
            <input
              type='text'
              placeholder='CVV'
              className='w-full bg-gray-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
            />
          </div>
          <button className='w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition duration-300 flex items-center justify-center gap-2'>
            <BsCheckCircleFill className='text-lg' /> Add Card
          </button>
        </motion.div>

        {/* Saved Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='bg-gray-800/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg'
        >
          <h3 className='text-2xl font-semibold text-white flex items-center gap-3 mb-4'>
            <FaWallet className='text-green-500 text-2xl' /> Saved Payment Methods
          </h3>
          <p className='text-gray-300 mb-4'>Manage your saved payment methods.</p>
          <div className='space-y-4'>
            {/* Card 1 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className='flex items-center justify-between bg-gray-700/50 rounded-lg p-4 transition-all'
            >
              <div className='flex items-center space-x-4'>
                <SiVisa className='text-2xl text-blue-500' />
                <div>
                  <p className='text-white font-semibold'>Visa ending in 1234</p>
                  <p className='text-gray-400 text-sm'>Expires 12/25</p>
                </div>
              </div>
              <button className='text-red-500 hover:text-red-600 transition-colors'>Remove</button>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className='flex items-center justify-between bg-gray-700/50 rounded-lg p-4 transition-all'
            >
              <div className='flex items-center space-x-4'>
                <SiMastercard className='text-2xl text-red-500' />
                <div>
                  <p className='text-white font-semibold'>Mastercard ending in 5678</p>
                  <p className='text-gray-400 text-sm'>Expires 10/24</p>
                </div>
              </div>
              <button className='text-red-500 hover:text-red-600 transition-colors'>Remove</button>
            </motion.div>
          </div>
        </motion.div>

        {/* Other Payment Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='bg-gray-800/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg'
        >
          <h3 className='text-2xl font-semibold text-white flex items-center gap-3 mb-4'>
            <FaPaypal className='text-blue-500 text-2xl' /> Other Payment Options
          </h3>
          <p className='text-gray-300 mb-4'>Choose from other available payment methods.</p>
          <div className='grid grid-cols-2 gap-4'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className='flex items-center justify-center space-x-2 bg-gray-700/50 rounded-lg p-4 hover:bg-gray-600/70 transition-colors'
            >
              <FaPaypal className='text-2xl text-blue-500' />
              <span className='text-white'>PayPal</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className='flex items-center justify-center space-x-2 bg-gray-700/50 rounded-lg p-4 hover:bg-gray-600/70 transition-colors'
            >
              <FaApplePay className='text-2xl text-gray-100' />
              <span className='text-white'>Apple Pay</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className='flex items-center justify-center space-x-2 bg-gray-700/50 rounded-lg p-4 hover:bg-gray-600/70 transition-colors'
            >
              <FaGooglePay className='text-2xl text-green-500' />
              <span className='text-white'>Google Pay</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className='flex items-center justify-center space-x-2 bg-gray-700/50 rounded-lg p-4 hover:bg-gray-600/70 transition-colors'
            >
              <FaBitcoin className='text-2xl text-orange-500' />
              <span className='text-white'>Bitcoin</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Payment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='bg-gray-800/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg'
        >
          <h3 className='text-2xl font-semibold text-white flex items-center gap-3 mb-4'>
            <FaHistory className='text-yellow-500 text-2xl' /> Payment History
          </h3>
          <p className='text-gray-300 mb-4'>Review your recent transactions.</p>
          <div className='space-y-4'>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className='flex items-center justify-between bg-gray-700/50 rounded-lg p-4 transition-all'
            >
              <div>
                <p className='text-white font-semibold'>Netflix Subscription</p>
                <p className='text-gray-400 text-sm'>12 Oct 2023</p>
              </div>
              <p className='text-red-500 font-semibold'>-$15.99</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className='flex items-center justify-between bg-gray-700/50 rounded-lg p-4 transition-all'
            >
              <div>
                <p className='text-white font-semibold'>Spotify Subscription</p>
                <p className='text-gray-400 text-sm'>10 Oct 2023</p>
              </div>
              <p className='text-red-500 font-semibold'>-$9.99</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Promotional Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className='bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-6 shadow-lg'
        >
          <h3 className='text-2xl font-semibold text-white mb-4'>Get 10% Cashback!</h3>
          <p className='text-gray-200 mb-4'>
            Use code <span className='font-bold'>CASHBACK10</span> for instant cashback on your next
            payment.
          </p>
          <button className='w-full bg-white text-pink-500 p-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2'>
            Apply Code <BsArrowRightShort className='text-xl' />
          </button>
        </motion.div>

        {/* Supported Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className='bg-gray-800/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg'
        >
          <h3 className='text-2xl font-semibold text-white flex items-center gap-3 mb-4'>
            <SiStripe className='text-purple-500 text-2xl' /> Supported Payment Methods
          </h3>
          <p className='text-gray-300 mb-4'>We support a wide range of payment options.</p>
          <div className='flex items-center justify-around'>
            <motion.div whileHover={{ scale: 1.2 }}>
              <SiVisa className='text-4xl text-blue-500' />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }}>
              <SiMastercard className='text-4xl text-red-500' />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }}>
              <FaPaypal className='text-4xl text-blue-500' />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }}>
              <FaApplePay className='text-4xl text-gray-100' />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }}>
              <FaGooglePay className='text-4xl text-green-500' />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }}>
              <FaBitcoin className='text-4xl text-orange-500' />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentMethods;
