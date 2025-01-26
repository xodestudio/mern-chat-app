import React, { useState } from 'react';
import { AiOutlineVideoCamera, AiOutlinePhone, AiOutlineInfoCircle } from 'react-icons/ai';
import { FaMicrophone, FaImage } from 'react-icons/fa';
import { BsThreeDots, BsPaperclip } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import { IoMdAddCircleOutline } from 'react-icons/io';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from 'react-redux';
import Profile from './Profile';

const Dashboard = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { otherUsers } = useSelector(store => store.user);

  useGetOtherUsers();

  const selectedUser = otherUsers[0];

  return (
    <div className='overflow-hidden h-screen flex bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-300 font-sans'>
      {/* Sidebar */}
      <aside className='w-1/4 md:w-1/5 lg:w-1/6 bg-gray-800 border-r border-gray-700'>
        <div className='p-4 flex justify-between items-center border-b border-gray-700'>
          <h1 className='text-xl md:text-2xl font-bold text-white'>Messenger</h1>
          <BsThreeDots className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
        </div>

        {/* Stories Section */}
        <div className='p-4 flex items-center space-x-3 border-b border-gray-700'>
          <IoMdAddCircleOutline className='text-4xl md:text-5xl text-blue-500 cursor-pointer hover:text-blue-400' />
          <div className='flex space-x-2'>
            <img
              src='https://randomuser.me/api/portraits/women/1.jpg'
              alt='Anna'
              className='w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-blue-500'
              loading='lazy'
            />
            <img
              src='https://randomuser.me/api/portraits/men/2.jpg'
              alt='Jeff'
              className='w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-500'
              loading='lazy'
            />
            <img
              src='https://randomuser.me/api/portraits/women/3.jpg'
              alt='Cathy'
              className='w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-green-500'
              loading='lazy'
            />
          </div>
        </div>

        {/* Chat List */}
        <div className='overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900'>
          {otherUsers.map(user => (
            <div
              key={user._id}
              className='p-4 flex items-center space-x-3 hover:bg-gray-700 cursor-pointer transition-colors duration-200'
            >
              <div className='relative'>
                <img
                  src={user.avatar}
                  alt='Avatar'
                  className='w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-gray-700'
                />
              </div>
              <div>
                <h2 className='text-sm md:text-base font-semibold text-white'>{user.username}</h2>
                <p className='text-xs md:text-sm text-gray-400'>Hey, Are you there? 10min</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className='flex-1 flex'>
        {/* Chat Window */}
        {!showProfile && (
          <section className='flex-1 flex flex-col'>
            {/* Header */}
            <div className='p-4 flex items-center justify-between border-b border-gray-700 bg-gray-800'>
              <div className='flex items-center space-x-3'>
                <img
                  src={selectedUser?.avatar}
                  alt='Avatar'
                  className='w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-gray-700'
                />
                <div>
                  <h2 className='text-sm md:text-base font-semibold text-white'>
                    {selectedUser?.username}
                  </h2>
                  <p className='text-xs md:text-sm text-gray-400'>Active 1h ago</p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <AiOutlineVideoCamera className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
                <AiOutlinePhone className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
                <AiOutlineInfoCircle
                  className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white'
                  onClick={() => setShowProfile(true)} // Show profile
                />
              </div>
            </div>

            {/* Main Content */}
            <div className='flex-1 overflow-y-auto p-4 bg-gray-900'>
              {/* Chat Messages */}
              <div className='flex flex-col items-start'>
                <div className='bg-gray-700 text-sm md:text-base px-4 py-2 rounded-lg max-w-xs md:max-w-sm'>
                  Hey! How are you?
                </div>
                <div className='bg-gray-700 text-sm md:text-base px-4 py-2 rounded-lg max-w-xs md:max-w-sm mt-1'>
                  Shall we go for Hiking this weekend?
                </div>
              </div>

              <div className='flex flex-col items-end'>
                <div className='bg-blue-600 text-sm md:text-base px-4 py-2 rounded-lg max-w-xs md:max-w-sm'>
                  I’m doing great! What about you?
                </div>
                <div className='bg-blue-600 text-sm md:text-base px-4 py-2 rounded-lg max-w-xs md:max-w-sm mt-1'>
                  Yes, that sounds amazing!
                </div>
              </div>

              {isTyping && (
                <div className='text-sm md:text-base text-gray-400'>
                  <span>Typing...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <div className='p-4 border-t border-gray-700 flex items-center space-x-4 bg-gray-800'>
              <FaImage className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
              <BsPaperclip className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
              <FaMicrophone className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
              <input
                type='text'
                placeholder='Type a message...'
                className='flex-1 bg-gray-700 text-sm md:text-base px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white'
                onChange={e => setIsTyping(e.target.value.length > 0)}
              />
              <FiSend className='text-xl md:text-2xl cursor-pointer text-blue-500 hover:text-blue-400' />
            </div>
          </section>
        )}

        {/* Profile Section */}
        {showProfile && (
          <div className='flex-1'>
            <Profile onClose={() => setShowProfile(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
