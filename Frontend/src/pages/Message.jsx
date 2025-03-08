import React from 'react';
import { motion } from 'framer-motion';

const Message = ({ message, isLoggedInUser, senderAvatar }) => {
  return (
    <motion.div
      className={`flex ${isLoggedInUser ? 'justify-end' : 'justify-start'} space-x-2 mb-4`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sender's Profile Photo (Only for other users) */}
      {!isLoggedInUser && (
        <motion.div
          className='flex-shrink-0'
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={senderAvatar}
            alt='Sender Avatar'
            className='object-cover w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-gray-700 shadow-lg'
          />
        </motion.div>
      )}

      {/* Message Content and Time */}
      <div className={`flex flex-col ${isLoggedInUser ? 'items-end' : 'items-start'}`}>
        <motion.div
          className={`${
            isLoggedInUser
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
              : 'bg-gray-800/70 backdrop-blur-sm text-gray-300'
          } text-sm md:text-base px-4 py-2 md:px-5 md:py-3 rounded-2xl max-w-xs md:max-w-md shadow-lg`}
          whileHover={{
            boxShadow: isLoggedInUser
              ? '0 10px 20px rgba(100, 100, 255, 0.3)'
              : '0 10px 20px rgba(255, 255, 255, 0.3)'
          }}
          transition={{ duration: 0.3 }}
        >
          {message?.message || 'No message available'}
        </motion.div>

        {/* Message Time */}
        <motion.span
          className='text-xs text-gray-400 mt-1'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {message?.createdAt
            ? new Date(message.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })
            : 'Invalid Date'}
        </motion.span>
      </div>

      {/* Sender's Profile Photo (Only for logged-in user) */}
      {isLoggedInUser && (
        <motion.div
          className='flex-shrink-0'
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={senderAvatar}
            alt='Sender Avatar'
            className='object-cover w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-gray-700 shadow-lg'
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Message;
