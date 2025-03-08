import React from 'react';
import { FaLock, FaChevronLeft } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineInfoCircle } from 'react-icons/ai';
import { BsShieldLock, BsChatSquareText, BsCheckCircleFill } from 'react-icons/bs';
import { MdOutlineSecurityUpdateGood } from 'react-icons/md';

const PrivacySettings = ({ onClose }) => {
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
      <h2 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8 text-center'>
        Privacy Settings
      </h2>

      {/* Privacy Options */}
      <div className='space-y-8'>
        {/* Profile Visibility Section */}
        <div className='bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg'>
          <h3 className='text-2xl font-semibold text-white flex items-center gap-3 mb-4'>
            <AiOutlineEye className='text-blue-500 text-2xl' /> Profile Visibility
          </h3>
          <p className='text-gray-300 mb-4'>Control who can see your profile information.</p>
          <select className='w-full bg-gray-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'>
            <option value='public'>Everyone</option>
            <option value='friends'>Friends Only</option>
            <option value='private'>Only Me</option>
          </select>
        </div>

        {/* Blocked Users Section */}
        <div className='bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg'>
          <h3 className='text-2xl font-semibold text-white flex items-center gap-3 mb-4'>
            <BsShieldLock className='text-red-500 text-2xl' /> Blocked Users
          </h3>
          <p className='text-gray-300 mb-4'>
            Manage users you've blocked or unblock them if needed.
          </p>
          <button className='w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2'>
            <BsCheckCircleFill className='text-lg' /> View Blocked Users
          </button>
        </div>

        {/* Activity Log Section */}
        <div className='bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg'>
          <h3 className='text-2xl font-semibold text-white flex items-center gap-3 mb-4'>
            <AiOutlineInfoCircle className='text-purple-500 text-2xl' /> Activity Log
          </h3>
          <p className='text-gray-300 mb-4'>
            Review your recent activity and manage your privacy history.
          </p>
          <button className='w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center gap-2'>
            <MdOutlineSecurityUpdateGood className='text-lg' /> View Activity Log
          </button>
        </div>

        {/* Data Usage & Security Section */}
        <div className='bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg'>
          <h3 className='text-2xl font-semibold text-white flex items-center gap-3 mb-4'>
            <FaLock className='text-green-500 text-2xl' /> Data Usage & Security
          </h3>
          <p className='text-gray-300 mb-4'>
            Control how your data is used and enhance your account security.
          </p>
          <div className='flex flex-col md:flex-row gap-4'>
            <button className='w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center gap-2'>
              <BsCheckCircleFill className='text-lg' /> Download Your Data
            </button>
            <button className='w-full bg-yellow-600 text-white p-3 rounded-lg hover:bg-yellow-700 transition duration-300 flex items-center justify-center gap-2'>
              <BsCheckCircleFill className='text-lg' /> Enable Two-Factor Authentication
            </button>
          </div>
        </div>

        {/* Feedback Section */}
        <div className='bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg'>
          <h3 className='text-2xl font-semibold text-white flex items-center gap-3 mb-4'>
            <BsChatSquareText className='text-teal-500 text-2xl' /> Share Your Feedback
          </h3>
          <p className='text-gray-300 mb-4'>Let us know how we can improve our privacy settings.</p>
          <textarea
            placeholder='Type your feedback here...'
            className='w-full bg-gray-700/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32 mb-4'
          ></textarea>
          <button className='w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition duration-300 flex items-center justify-center gap-2'>
            <BsCheckCircleFill className='text-lg' /> Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
