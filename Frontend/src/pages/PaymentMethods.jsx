import React, { useState } from 'react';
import {
  FaUserCircle,
  FaChevronLeft,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaHistory,
  FaBell,
  FaShieldAlt
} from 'react-icons/fa';
import { SiGoogleanalytics } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';

const AccountSettings = () => {
  // State to manage visibility of the component
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle visibility
  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <div className='h-screen bg-gray-900 text-white p-6'>
      {/* Button to Open Account Settings */}
      <button
        onClick={toggleVisibility}
        className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'
      >
        Open Account Settings
      </button>

      {/* Render AccountSettings Component */}
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
              onClick={toggleVisibility}
              className='absolute top-6 left-6 text-gray-300 transition-colors bg-gray-800/50 rounded-full p-3 hover:bg-gray-700/70'
            >
              <FaChevronLeft className='text-xl' />
            </button>

            {/* Header */}
            <h2 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8 text-center'>
              Account Settings
            </h2>

            {/* Main Content */}
            <div className='flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto'>
              {/* Left Column */}
              <div className='space-y-6'>
                {/* Profile Information */}
                <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
                  <h3 className='text-xl font-semibold text-white mb-4 flex items-center space-x-2'>
                    <FaUserCircle className='text-2xl text-blue-500' />
                    <span>Profile Information</span>
                  </h3>
                  <div className='space-y-4'>
                    <input
                      type='text'
                      placeholder='Full Name'
                      className='w-full bg-gray-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                      type='email'
                      placeholder='Email Address'
                      className='w-full bg-gray-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                      type='tel'
                      placeholder='Phone Number'
                      className='w-full bg-gray-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <button className='w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors'>
                      Save Changes
                    </button>
                  </div>
                </div>

                {/* Security Settings */}
                <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
                  <h3 className='text-xl font-semibold text-white mb-4 flex items-center space-x-2'>
                    <FaLock className='text-2xl text-green-500' />
                    <span>Security Settings</span>
                  </h3>
                  <div className='space-y-4'>
                    <button className='w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2'>
                      <FaLock className='text-lg' /> Change Password
                    </button>
                    <button className='w-full bg-yellow-600 text-white p-3 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2'>
                      <FaShieldAlt className='text-lg' /> Enable Two-Factor Authentication
                    </button>
                  </div>
                </div>

                {/* Activity History */}
                <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
                  <h3 className='text-xl font-semibold text-white mb-4 flex items-center space-x-2'>
                    <FaHistory className='text-2xl text-yellow-500' />
                    <span>Activity History</span>
                  </h3>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between bg-gray-700/50 rounded-lg p-4'>
                      <div>
                        <p className='text-white font-semibold'>Logged in from New Device</p>
                        <p className='text-gray-400 text-sm'>12 Oct 2023</p>
                      </div>
                    </div>
                    <div className='flex items-center justify-between bg-gray-700/50 rounded-lg p-4'>
                      <div>
                        <p className='text-white font-semibold'>Updated Profile Picture</p>
                        <p className='text-gray-400 text-sm'>10 Oct 2023</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className='space-y-6'>
                {/* Notifications */}
                <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
                  <h3 className='text-xl font-semibold text-white mb-4 flex items-center space-x-2'>
                    <FaBell className='text-2xl text-teal-500' />
                    <span>Notifications</span>
                  </h3>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <p className='text-gray-400'>Email Notifications</p>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input type='checkbox' className='sr-only peer' defaultChecked />
                        <div className='w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600'></div>
                      </label>
                    </div>
                    <div className='flex items-center justify-between'>
                      <p className='text-gray-400'>Push Notifications</p>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input type='checkbox' className='sr-only peer' />
                        <div className='w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600'></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Analytics */}
                <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
                  <h3 className='text-xl font-semibold text-white mb-4 flex items-center space-x-2'>
                    <SiGoogleanalytics className='text-2xl text-purple-500' />
                    <span>Account Analytics</span>
                  </h3>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <p className='text-gray-400'>Total Logins</p>
                      <p className='text-white font-semibold'>125</p>
                    </div>
                    <div className='flex items-center justify-between'>
                      <p className='text-gray-400'>Active Sessions</p>
                      <p className='text-white font-semibold'>3</p>
                    </div>
                  </div>
                </div>

                {/* Promotional Banner */}
                <div className='bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-6'>
                  <h3 className='text-xl font-semibold text-white mb-4'>Upgrade Your Plan!</h3>
                  <p className='text-gray-200 mb-4'>
                    Unlock premium features by upgrading to our Pro plan today.
                  </p>
                  <button className='w-full bg-white text-green-600 p-3 rounded-lg hover:bg-gray-100 transition-colors'>
                    Upgrade Now
                  </button>
                </div>

                {/* Supported Features */}
                <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
                  <h3 className='text-xl font-semibold text-white mb-4'>Supported Features</h3>
                  <div className='flex items-center justify-around'>
                    <FaEnvelope className='text-4xl text-blue-500' />
                    <FaPhone className='text-4xl text-green-500' />
                    <FaBell className='text-4xl text-teal-500' />
                    <FaLock className='text-4xl text-red-500' />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountSettings;
