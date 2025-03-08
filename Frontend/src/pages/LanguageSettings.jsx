import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { AiOutlineGlobal, AiOutlineInfoCircle } from 'react-icons/ai';
import { BsChatSquareText } from 'react-icons/bs';
import { motion } from 'framer-motion';

const LanguageSettings = ({ onClose }) => {
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
        Language Settings
      </h2>

      {/* Language Options */}
      <div className='space-y-8'>
        {/* Select Language Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-gray-800/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg'
        >
          <h3 className='text-2xl font-semibold text-white flex items-center gap-3 mb-4'>
            <AiOutlineGlobal className='text-blue-500 text-2xl' /> Select Language
          </h3>
          <p className='text-gray-300 mb-4'>Choose your preferred language for the app.</p>
          <select className='w-full bg-gray-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'>
            <option value='en'>English</option>
            <option value='es'>Spanish</option>
            <option value='fr'>French</option>
            <option value='de'>German</option>
            <option value='zh'>Chinese</option>
            <option value='ar'>Arabic</option>
          </select>
        </motion.div>

        {/* Regional Settings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='bg-gray-800/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg'
        >
          <h3 className='text-2xl font-semibold text-white flex items-center gap-3 mb-4'>
            <AiOutlineInfoCircle className='text-purple-500 text-2xl' /> Regional Settings
          </h3>
          <p className='text-gray-300 mb-4'>
            Adjust your regional preferences to customize your experience.
          </p>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='w-full'>
              <label className='block text-gray-400 mb-2'>Country</label>
              <select className='w-full bg-gray-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <option value='us'>United States</option>
                <option value='es'>Spain</option>
                <option value='fr'>France</option>
                <option value='de'>Germany</option>
                <option value='cn'>China</option>
                <option value='sa'>Saudi Arabia</option>
              </select>
            </div>
            <div className='w-full'>
              <label className='block text-gray-400 mb-2'>Timezone</label>
              <select className='w-full bg-gray-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <option value='utc-5'>UTC-5 (Eastern Time)</option>
                <option value='utc+1'>UTC+1 (Central European Time)</option>
                <option value='utc+8'>UTC+8 (China Standard Time)</option>
                <option value='utc+3'>UTC+3 (East Africa Time)</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Feedback Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='bg-gray-800/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg'
        >
          <h3 className='text-2xl font-semibold text-white flex items-center gap-3 mb-4'>
            <BsChatSquareText className='text-teal-500 text-2xl' /> Share Your Feedback
          </h3>
          <p className='text-gray-300 mb-4'>
            Let us know how we can improve our language and regional settings.
          </p>
          <textarea
            placeholder='Type your feedback here...'
            className='w-full bg-gray-700/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32 mb-4'
          ></textarea>
          <button className='w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-3 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition duration-300 flex items-center justify-center gap-2'>
            Submit Feedback
          </button>
        </motion.div>

        {/* Help & Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='bg-gray-800/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg'
        >
          <h3 className='text-2xl font-semibold text-white flex items-center gap-3 mb-4'>
            <AiOutlineInfoCircle className='text-yellow-500 text-2xl' /> Need Help?
          </h3>
          <p className='text-gray-300 mb-4'>
            If you're having trouble with language settings, reach out to our support team.
          </p>
          <div className='flex flex-col md:flex-row gap-4'>
            <button className='w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300 flex items-center justify-center gap-2'>
              <AiOutlineGlobal className='text-lg' /> Contact Support
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LanguageSettings;
