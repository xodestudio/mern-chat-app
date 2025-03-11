import React from 'react';
import { motion } from 'framer-motion';

const Message = ({ message, isLoggedInUser, senderAvatar }) => {
  const hasFile = !!message.file;
  const hasText = !!message.message;

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
          className={`flex-shrink-0 ${hasFile ? 'self-end' : 'self-start'}`}
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
        {/* Container for File and Text */}
        <div
          className={`${
            isLoggedInUser
              ? 'hover:bg-gray-500/70 bg-blue-700/70 text-white'
              : 'hover:bg-gray-500/70 bg-gray-600/70 text-gray-300'
          } rounded-2xl backdrop-blur-sm shadow-lg overflow-hidden transition duration-300 ease-in-out`}
        >
          {/* Display File (if present) */}
          {hasFile && (
            <div className='p-2'>
              {message.file.endsWith('.jpg') ||
              message.file.endsWith('.png') ||
              message.file.endsWith('.jpeg') ? (
                <img src={message.file} alt='Attachment' className='max-w-xs rounded-lg' />
              ) : message.file.endsWith('.pdf') ? (
                <a
                  href={message.file}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500'
                >
                  View PDF
                </a>
              ) : message.file.endsWith('.mp4') || message.file.endsWith('.avi') ? (
                <video controls className='max-w-xs rounded-lg'>
                  <source src={message.file} type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <a
                  href={message.file}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500'
                >
                  Download File
                </a>
              )}
            </div>
          )}

          {/* Display Text Message (if present) */}
          {hasText && (
            <div className='px-4 py-2'>
              <p className='text-sm md:text-base'>{message.message}</p>
            </div>
          )}
        </div>

        {/* Display Time (below the bubble) */}
        {(hasFile || hasText) && (
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
        )}
      </div>

      {/* Sender's Profile Photo (Only for logged-in user) */}
      {isLoggedInUser && (
        <motion.div
          className='flex-shrink-0 self-start'
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
