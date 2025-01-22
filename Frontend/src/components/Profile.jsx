import React, { useState } from 'react';
import {
  FaUserEdit,
  FaKey,
  FaFileAlt,
  FaCreditCard,
  FaBell,
  FaQuestionCircle,
  FaSignOutAlt,
  FaChevronRight,
  FaLanguage
} from 'react-icons/fa';

const Profile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  const handleLanguageChange = language => {
    setSelectedLanguage(language);
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-100 to-pink-100 flex justify-center items-center relative'>
      {/* Button to toggle sidebar */}
      <button
        onClick={toggleSidebar}
        className='absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-gradient-to-l hover:from-blue-600 hover:to-indigo-600 transition duration-300 ease-in-out'
      >
        <FaBell className='inline-block mr-2' /> Notifications
      </button>

      {/* Sidebar with animation */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '400px' }}
      >
        <div className='p-6 pt-4'>
          {/* Profile Header with Cover Image */}
          <div
            className='relative mb-4 w-full h-40 rounded-lg overflow-hidden bg-cover bg-center'
            style={{
              backgroundImage:
                'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0OqeAjbgKArlQv8CCghUa7GabClPUk3WKPeSGB0ywd3aos8JhHxIscPE&s)'
            }}
          >
            {/* Profile Image */}
            <div className='absolute bottom-0 left-4 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg'>
              <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0OqeAjbgKArlQv8CCghUa7GabClPUk3WKPeSGB0ywd3aos8JhHxIscPE&s'
                alt='Profile'
                className='w-full h-full object-cover'
              />
            </div>
          </div>

          {/* Name and Email */}
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-semibold text-gray-800'>Scarlett Davis</h2>
            <p className='text-md text-gray-500'>scarlettdavis@gmail.com</p>
          </div>

          {/* General Section */}
          <div className='mb-6'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>General</h3>
            <div className='space-y-4'>
              <div className='flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gradient-to-l hover:from-gray-200 hover:to-gray-300 transition duration-300'>
                <FaUserEdit className='text-blue-500 text-xl mr-4' />
                <span className='text-sm font-medium text-gray-700'>Edit Profile</span>
                <FaChevronRight className='ml-auto text-gray-400' />
              </div>
              <div className='flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gradient-to-l hover:from-gray-200 hover:to-gray-300 transition duration-300'>
                <FaKey className='text-blue-500 text-xl mr-4' />
                <span className='text-sm font-medium text-gray-700'>Change Password</span>
                <FaChevronRight className='ml-auto text-gray-400' />
              </div>
              <div className='flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gradient-to-l hover:from-gray-200 hover:to-gray-300 transition duration-300'>
                <FaFileAlt className='text-blue-500 text-xl mr-4' />
                <span className='text-sm font-medium text-gray-700'>Terms of Use</span>
                <FaChevronRight className='ml-auto text-gray-400' />
              </div>
              <div className='flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gradient-to-l hover:from-gray-200 hover:to-gray-300 transition duration-300'>
                <FaCreditCard className='text-blue-500 text-xl mr-4' />
                <span className='text-sm font-medium text-gray-700'>Add Card</span>
                <FaChevronRight className='ml-auto text-gray-400' />
              </div>

              {/* Custom Styled Language Dropdown */}
              <div className='relative'>
                <label htmlFor='language' className='block text-sm font-medium text-gray-700 mb-2'>
                  Language
                </label>
                <div
                  className='relative w-full cursor-pointer'
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className='flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg shadow-sm hover:bg-gradient-to-l hover:from-gray-200 hover:to-gray-300 transition duration-200'>
                    <div className='flex items-center space-x-2'>
                      <FaLanguage className='text-blue-500 text-xl' />
                      <span className='text-sm font-medium text-gray-700'>{selectedLanguage}</span>
                    </div>
                    <FaChevronRight className='text-gray-400' />
                  </div>
                  {dropdownOpen && (
                    <div className='absolute right-0 mt-2 w-full bg-white shadow-lg rounded-md border border-gray-200 z-10'>
                      <div
                        onClick={() => handleLanguageChange('English')}
                        className='cursor-pointer p-3 hover:bg-gray-100 flex items-center space-x-2'
                      >
                        <span>English</span>
                      </div>
                      <div
                        onClick={() => handleLanguageChange('Urdu')}
                        className='cursor-pointer p-3 hover:bg-gray-100 flex items-center space-x-2'
                      >
                        <span>Urdu</span>
                      </div>
                      <div
                        onClick={() => handleLanguageChange('Spanish')}
                        className='cursor-pointer p-3 hover:bg-gray-100 flex items-center space-x-2'
                      >
                        <span>Spanish</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>Preferences</h3>
            <div className='space-y-4'>
              <div className='flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gradient-to-l hover:from-gray-200 hover:to-gray-300 transition duration-300'>
                <FaBell className='text-blue-500 text-xl mr-4' />
                <span className='text-sm font-medium text-gray-700'>Notification</span>
                <FaChevronRight className='ml-auto text-gray-400' />
              </div>
              <div className='flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gradient-to-l hover:from-gray-200 hover:to-gray-300 transition duration-300'>
                <FaQuestionCircle className='text-blue-500 text-xl mr-4' />
                <span className='text-sm font-medium text-gray-700'>FAQ</span>
                <FaChevronRight className='ml-auto text-gray-400' />
              </div>
              <div className='flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gradient-to-l hover:from-gray-200 hover:to-gray-300 transition duration-300'>
                <FaSignOutAlt className='text-blue-500 text-xl mr-4' />
                <span className='text-sm font-medium text-gray-700'>Logout</span>
                <FaChevronRight className='ml-auto text-gray-400' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
