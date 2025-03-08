import React from 'react';
import {
  FaChevronLeft,
  FaQuestionCircle,
  FaCommentDots,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';
import { AiOutlineInfoCircle, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { BsChatSquareText, BsTwitter, BsInstagram, BsFacebook } from 'react-icons/bs';
import { motion } from 'framer-motion';

const HelpSupport = ({ onClose }) => {
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
        Help & Support
      </h2>

      {/* Help Options */}
      <div className='space-y-8'>
        {/* Contact Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-gray-800/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg'
        >
          <h3 className='text-2xl font-semibold text-white flex items-center gap-3 mb-4'>
            <FaEnvelope className='text-blue-500 text-2xl' /> Contact Support
          </h3>
          <p className='text-gray-300 mb-4'>
            Need help? Reach out to our support team via email or phone.
          </p>
          <div className='flex flex-col md:flex-row gap-4'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className='w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300 flex items-center justify-center gap-2'
            >
              <AiOutlineMail className='text-lg' /> Email Us
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className='w-full bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-lg hover:from-green-600 hover:to-teal-600 transition duration-300 flex items-center justify-center gap-2'
            >
              <AiOutlinePhone className='text-lg' /> Call Us
            </motion.button>
          </div>
        </motion.div>

        {/* FAQs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='bg-gray-800/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg'
        >
          <h3 className='text-2xl font-semibold text-white flex items-center gap-3 mb-4'>
            <FaQuestionCircle className='text-yellow-500 text-2xl' /> Frequently Asked Questions
          </h3>
          <div className='space-y-4'>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className='bg-gray-700/50 p-4 rounded-lg transition-transform'
            >
              <h4 className='text-lg font-medium text-white mb-2'>How do I reset my password?</h4>
              <p className='text-gray-300'>
                Go to the login page and click on "Forgot Password." Follow the instructions sent to
                your email.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className='bg-gray-700/50 p-4 rounded-lg transition-transform'
            >
              <h4 className='text-lg font-medium text-white mb-2'>
                How can I contact customer support?
              </h4>
              <p className='text-gray-300'>
                You can reach us via email at support@example.com or call us at +123 456 7890.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Troubleshooting Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='bg-gray-800/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg'
        >
          <h3 className='text-2xl font-semibold text-white flex items-center gap-3 mb-4'>
            <AiOutlineInfoCircle className='text-purple-500 text-2xl' /> Troubleshooting
          </h3>
          <p className='text-gray-300 mb-4'>
            If you're experiencing issues, try the following steps:
          </p>
          <ul className='list-disc pl-6 text-gray-300 space-y-2'>
            <li>Clear your browser cache and cookies.</li>
            <li>Ensure your internet connection is stable.</li>
            <li>Restart the app or refresh the page.</li>
          </ul>
        </motion.div>

        {/* Feedback Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='bg-gray-800/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg'
        >
          <h3 className='text-2xl font-semibold text-white flex items-center gap-3 mb-4'>
            <BsChatSquareText className='text-teal-500 text-2xl' /> Share Your Feedback
          </h3>
          <p className='text-gray-300 mb-4'>
            We value your feedback! Let us know how we can improve.
          </p>
          <textarea
            placeholder='Type your feedback here...'
            className='w-full bg-gray-700/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32 mb-4'
          ></textarea>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className='w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-3 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition duration-300 flex items-center justify-center gap-2'
          >
            Submit Feedback
          </motion.button>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className='bg-gray-800/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg'
        >
          <h3 className='text-2xl font-semibold text-white flex items-center gap-3 mb-4'>
            <FaCommentDots className='text-pink-500 text-2xl' /> Connect With Us
          </h3>
          <div className='flex justify-center gap-6 text-3xl text-gray-300'>
            <motion.a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.2 }}
              className='hover:text-blue-400 transition-colors'
            >
              <BsTwitter />
            </motion.a>
            <motion.a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.2 }}
              className='hover:text-pink-500 transition-colors'
            >
              <BsInstagram />
            </motion.a>
            <motion.a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.2 }}
              className='hover:text-blue-600 transition-colors'
            >
              <BsFacebook />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpSupport;
