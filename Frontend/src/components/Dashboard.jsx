import React, { useEffect, useState } from 'react';
import { AiOutlineVideoCamera, AiOutlinePhone, AiOutlineInfoCircle } from 'react-icons/ai';
import { FaMicrophone, FaImage } from 'react-icons/fa';
import { BsThreeDots, BsPaperclip } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import { IoMdAddCircleOutline } from 'react-icons/io';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUsers } from '../redux/features/userSlice.js';
import Profile from './Profile';
import useGetMessages from '../hooks/useGetMessages.jsx';

const Dashboard = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { otherUsers } = useSelector(store => store.user);

  const dispatch = useDispatch();
  const { selectedUsers } = useSelector(store => store.user);
  const { messages } = useSelector(store => store.message);
  // if (!messages) return null;

  useGetMessages();
  useGetOtherUsers();

  const selectedUserHandler = user => {
    dispatch(setSelectedUsers(user));
  };

  return (
    <div className='overflow-hidden h-screen flex flex-col md:flex-row bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-300 font-poppins'>
      {/* Sidebar */}
      <aside className='w-full md:w-1/4 lg:w-1/5 xl:w-1/6 bg-gray-800 border-r border-gray-700'>
        <div className='p-4 md:p-6 flex justify-between items-center border-b border-gray-700'>
          <h1 className='text-xl md:text-2xl font-bold text-white'>Messenger</h1>
          <BsThreeDots className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
        </div>

        {/* Stories Section */}
        <div className='p-4 md:p-6 border-b border-gray-700'>
          <div className='flex items-center space-x-3 md:space-x-4 overflow-x-auto scrollbar-hide'>
            <IoMdAddCircleOutline className='text-3xl md:text-4xl text-blue-500 cursor-pointer hover:text-blue-400 flex-shrink-0' />
            <div className='flex space-x-2 md:space-x-3 overflow-x-auto scrollbar-hide'>
              {[1, 2, 3, 4, 5].map(item => (
                <img
                  key={item}
                  src={`https://randomuser.me/api/portraits/${
                    item % 2 === 0 ? 'men' : 'women'
                  }/${item}.jpg`}
                  alt={`User ${item}`}
                  className='w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-blue-500 flex-shrink-0'
                  loading='lazy'
                />
              ))}
            </div>
          </div>
        </div>

        {/* Chat List */}
        <div className='overflow-y-auto h-[calc(100vh-180px)] md:h-[calc(100vh-220px)] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900'>
          {otherUsers && otherUsers.length > 0 ? (
            otherUsers.map(user => (
              <div
                key={user._id}
                onClick={() => selectedUserHandler(user)}
                className={`p-3 md:p-4 flex items-center space-x-3 md:space-x-4 hover:bg-gray-700 cursor-pointer transition-colors duration-200 ${
                  selectedUsers?._id === user._id ? 'bg-gray-700' : ''
                }`}
              >
                <div className='relative'>
                  <img
                    src={user.avatar}
                    alt='Avatar'
                    className='w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-700'
                  />
                </div>
                <div>
                  <h2 className='text-sm md:text-base font-semibold text-white'>{user.username}</h2>
                  <p className='text-xs md:text-sm text-gray-400'>Hey, Are you there? 10min</p>
                </div>
              </div>
            ))
          ) : (
            <div className='p-4 text-center text-gray-500'>No users available.</div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className='flex-1 flex flex-col'>
        {/* Chat Window */}
        {!showProfile && (
          <section className='flex-1 flex flex-col'>
            {/* Header */}
            <div className='p-4 md:p-6 flex items-center justify-between border-b border-gray-700 bg-gray-800'>
              <div className='flex items-center space-x-3 md:space-x-4'>
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0OqeAjbgKArlQv8CCghUa7GabClPUk3WKPeSGB0ywd3aos8JhHxIscPE&s'
                  alt='Avatar'
                  className='w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-700'
                />
                <div>
                  <h2 className='text-sm md:text-base font-semibold text-white'>Hello World</h2>
                  <p className='text-xs md:text-sm text-gray-400'>Active 1h ago</p>
                </div>
              </div>
              <div className='flex items-center space-x-4 md:space-x-6'>
                <AiOutlineVideoCamera className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
                <AiOutlinePhone className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
                <AiOutlineInfoCircle
                  className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white'
                  onClick={() => setShowProfile(true)}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className='flex-1 overflow-y-auto p-4 md:p-6 bg-gray-900'>
              {/* Chat Messages */}
              <div className='flex flex-col items-start space-y-2 md:space-y-3'>
                {messages?.map((message, index) => (
                  <div
                    key={index}
                    className='bg-gray-700 text-sm md:text-base px-4 py-2 md:px-5 md:py-3 rounded-lg max-w-xs md:max-w-md'
                  >
                    {console.log('messages', messages)}
                    {message?.message || 'No message available'}
                  </div>
                ))}
              </div>

              <div className='flex flex-col items-end space-y-2 md:space-y-3 mt-4'>
                <div className='bg-blue-600 text-sm md:text-base px-4 py-2 md:px-5 md:py-3 rounded-lg max-w-xs md:max-w-md'>
                  I’m doing great! What about you?
                </div>
                <div className='bg-blue-600 text-sm md:text-base px-4 py-2 md:px-5 md:py-3 rounded-lg max-w-xs md:max-w-md'>
                  Yes, that sounds amazing!
                </div>
              </div>

              {isTyping && (
                <div className='text-xs md:text-sm text-gray-400 mt-4'>
                  <span>Typing...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <div className='p-4 md:p-6 border-t border-gray-700 flex items-center space-x-4 md:space-x-6 bg-gray-800'>
              <FaImage className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
              <BsPaperclip className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
              <FaMicrophone className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
              <input
                type='text'
                placeholder='Type a message...'
                className='flex-1 bg-gray-700 text-sm md:text-base px-4 py-2 md:px-5 md:py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white'
                onChange={e => setIsTyping(e.target.value.length > 0)}
              />
              <FiSend className='text-xl md:text-2xl cursor-pointer text-blue-500 hover:text-blue-400' />
            </div>
          </section>
        )}

        {/* Profile Section */}
        {showProfile && <Profile onClose={() => setShowProfile(false)} />}
      </div>
    </div>
  );
};

export default Dashboard;
