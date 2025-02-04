import React from 'react';

const Message = ({ message, isLoggedInUser, senderAvatar }) => {
  return (
    <div className={`flex ${isLoggedInUser ? 'justify-end' : 'justify-start'} space-x-2 mb-4`}>
      {/* Sender's Profile Photo (Only for other users) */}
      {!isLoggedInUser && (
        <div className='flex-shrink-0'>
          <img
            src={senderAvatar}
            alt='Sender Avatar'
            className='w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-gray-700'
          />
        </div>
      )}

      {/* Message Content and Time */}
      <div className={`flex flex-col ${isLoggedInUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`${
            isLoggedInUser ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
          } text-sm md:text-base px-4 py-2 md:px-5 md:py-3 rounded-lg max-w-xs md:max-w-md`}
        >
          {message?.message || 'No message available'}
        </div>

        {/* Message Time */}
        <span className='text-xs text-gray-400 mt-1'>
          {new Date(message?.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>

      {/* Sender's Profile Photo (Only for logged-in user) */}
      {isLoggedInUser && (
        <div className='flex-shrink-0'>
          <img
            src={senderAvatar}
            alt='Sender Avatar'
            className='w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-gray-700'
          />
        </div>
      )}
    </div>
  );
};

export default Message;
