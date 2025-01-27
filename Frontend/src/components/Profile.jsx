import React, { useState } from 'react';
import {
  FaUserEdit,
  FaBell,
  FaSignOutAlt,
  FaChevronRight,
  FaTimes,
  FaLock,
  FaMoon,
  FaSun,
  FaCreditCard,
  FaLanguage,
  FaInfoCircle
} from 'react-icons/fa';

const Profile = ({ onClose }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <div className='h-full w-full bg-gray-900/90 backdrop-blur-lg p-6 overflow-y-auto animate-slideIn'>
      {/* Profile Header with Cover Image */}
      <div
        className='relative mb-8 w-full h-64 rounded-lg overflow-hidden bg-cover bg-center shadow-lg animate-fadeIn'
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)'
        }}
      >
        {/* Close Icon - Positioned at the top-right corner of the cover photo */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-300 hover:text-white transition-colors animate-fadeIn bg-gray-800/50 rounded-full p-2'
        >
          <FaTimes className='text-2xl' />
        </button>

        {/* Profile Image - Adjusted position to avoid being cut off */}
        <div className='absolute -bottom-0 left-6 w-28 h-28 rounded-full overflow-hidden border-4 border-white/80 shadow-lg bg-white'>
          <img
            src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            alt='Profile'
            className='w-full h-full object-cover object-top'
          />
        </div>
      </div>

      {/* Name and Email */}
      <div className='mt-20 mb-8 animate-fadeIn'>
        <h2 className='text-3xl font-bold text-white'>Scarlett Davis</h2>
        <p className='text-lg text-gray-300'>scarlettdavis@gmail.com</p>
      </div>

      {/* Grid Layout for Buttons */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fadeIn'>
        {/* Edit Profile */}
        <div className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'>
          <div className='p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition duration-300'>
            <FaUserEdit className='text-blue-400 text-2xl' />
          </div>
          <div className='ml-4'>
            <span className='text-lg font-semibold text-white'>Edit Profile</span>
            <p className='text-sm text-gray-300'>Update your personal information</p>
          </div>
          <FaChevronRight className='ml-auto text-gray-400 text-xl' />
        </div>

        {/* Privacy Settings */}
        <div className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'>
          <div className='p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition duration-300'>
            <FaLock className='text-blue-400 text-2xl' />
          </div>
          <div className='ml-4'>
            <span className='text-lg font-semibold text-white'>Privacy Settings</span>
            <p className='text-sm text-gray-300'>Manage your privacy preferences</p>
          </div>
          <FaChevronRight className='ml-auto text-gray-400 text-xl' />
        </div>

        {/* Dark Mode Toggle */}
        <div
          className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'
          onClick={toggleDarkMode}
        >
          <div className='p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition duration-300'>
            {darkMode ? (
              <FaMoon className='text-blue-400 text-2xl' />
            ) : (
              <FaSun className='text-blue-400 text-2xl' />
            )}
          </div>
          <div className='ml-4'>
            <span className='text-lg font-semibold text-white'>
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
            <p className='text-sm text-gray-300'>Switch between dark and light themes</p>
          </div>
          <div className='ml-auto'>
            <div
              className={`w-12 h-6 flex items-center rounded-full p-1 ${
                darkMode ? 'bg-blue-500' : 'bg-gray-500'
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* Notifications Toggle */}
        <div
          className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'
          onClick={toggleNotifications}
        >
          <div className='p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition duration-300'>
            <FaBell className='text-blue-400 text-2xl' />
          </div>
          <div className='ml-4'>
            <span className='text-lg font-semibold text-white'>Notifications</span>
            <p className='text-sm text-gray-300'>Manage your notification preferences</p>
          </div>
          <div className='ml-auto'>
            <div
              className={`w-12 h-6 flex items-center rounded-full p-1 ${
                notificationsEnabled ? 'bg-blue-500' : 'bg-gray-500'
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'>
          <div className='p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition duration-300'>
            <FaCreditCard className='text-blue-400 text-2xl' />
          </div>
          <div className='ml-4'>
            <span className='text-lg font-semibold text-white'>Payment Methods</span>
            <p className='text-sm text-gray-300'>Manage your payment options</p>
          </div>
          <FaChevronRight className='ml-auto text-gray-400 text-xl' />
        </div>

        {/* Language Settings */}
        <div className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'>
          <div className='p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition duration-300'>
            <FaLanguage className='text-blue-400 text-2xl' />
          </div>
          <div className='ml-4'>
            <span className='text-lg font-semibold text-white'>Language Settings</span>
            <p className='text-sm text-gray-300'>Change your preferred language</p>
          </div>
          <FaChevronRight className='ml-auto text-gray-400 text-xl' />
        </div>

        {/* Help & Support */}
        <div className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'>
          <div className='p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition duration-300'>
            <FaInfoCircle className='text-blue-400 text-2xl' />
          </div>
          <div className='ml-4'>
            <span className='text-lg font-semibold text-white'>Help & Support</span>
            <p className='text-sm text-gray-300'>Get assistance and support</p>
          </div>
          <FaChevronRight className='ml-auto text-gray-400 text-xl' />
        </div>

        {/* Logout */}
        <div className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'>
          <div className='p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition duration-300'>
            <FaSignOutAlt className='text-blue-400 text-2xl' />
          </div>
          <div className='ml-4'>
            <span className='text-lg font-semibold text-white'>Logout</span>
            <p className='text-sm text-gray-300'>Sign out of your account</p>
          </div>
          <FaChevronRight className='ml-auto text-gray-400 text-xl' />
        </div>
      </div>
    </div>
  );
};

export default Profile;
