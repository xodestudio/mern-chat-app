import React from 'react';
import {
  AiOutlineSearch,
  AiOutlineVideoCamera,
  AiOutlinePhone,
  AiOutlineInfoCircle
} from 'react-icons/ai';
import { FaMicrophone, FaImage } from 'react-icons/fa';
import { BsThreeDots, BsFillCircleFill, BsPaperclip } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import { IoMdAddCircleOutline } from 'react-icons/io';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  useGetOtherUsers();

  const { otherUsers } = useSelector(store => store.user);

  return (
    <div className='h-screen flex bg-gray-900 text-white font-sans'>
      {/* Sidebar */}
      <aside className='w-1/4 bg-gray-800 border-r border-gray-700 hidden lg:block'>
        <div className='p-4 flex justify-between items-center border-b border-gray-700'>
          <h1 className='text-2xl font-semibold'>Messenger</h1>
          <BsThreeDots className='text-xl cursor-pointer' />
        </div>

        {/* Search Bar */}
        <div className='p-4'>
          <div className='flex items-center bg-gray-700 px-3 py-2 rounded-lg'>
            <AiOutlineSearch className='text-gray-400 text-xl' />
            <input
              type='text'
              placeholder='Search Messenger'
              className='bg-transparent text-base text-gray-200 ml-3 w-full focus:outline-none'
            />
          </div>
        </div>

        {/* Stories Section */}
        <div className='p-4 flex items-center space-x-3 border-b border-gray-700'>
          <IoMdAddCircleOutline className='text-5xl text-blue-500 cursor-pointer' />
          <div className='flex space-x-1'>
            <img
              src='https://randomuser.me/api/portraits/women/1.jpg'
              alt='Anna'
              className='w-10 h-10 rounded-full border-2 border-blue-500'
            />
            <img
              src='https://randomuser.me/api/portraits/men/2.jpg'
              alt='Jeff'
              className='w-10 h-10 rounded-full border-2 border-gray-500'
            />
            <img
              src='https://randomuser.me/api/portraits/women/3.jpg'
              alt='Cathy'
              className='w-10 h-10 rounded-full border-2 border-green-500'
            />
          </div>
        </div>

        {/* Chat List */}
        <div className='overflow-y-auto'>
          {otherUsers.map(user => (
            <div
              key={user._id}
              className='p-4 flex items-center space-x-3 hover:bg-gray-700 cursor-pointer'
            >
              <div className='relative'>
                <img src={user.avatar} alt='Avatar' className='w-12 h-12 rounded-full' />
              </div>
              <div>
                <h2 className='text-base font-semibold'>{user.username}</h2>
                <p className='text-sm text-gray-400'>Hey, Are you there? 10min</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Window */}
      <section className='flex-1 flex flex-col'>
        {/* Header */}
        <div className='p-4 flex items-center justify-between border-b border-gray-700'>
          <div className='flex items-center space-x-3'>
            <img src={otherUsers[0]?.avatar} alt='Avatar' className='w-10 h-10 rounded-full' />
            <div>
              <h2 className='text-base font-semibold'>{otherUsers[0]?.username}</h2>
              <p className='text-sm text-gray-400'>Active 1h ago</p>
            </div>
          </div>
          <div className='flex items-center space-x-3'>
            <AiOutlineVideoCamera className='text-2xl cursor-pointer' />
            <AiOutlinePhone className='text-2xl cursor-pointer' />
            <AiOutlineInfoCircle className='text-2xl cursor-pointer' />
          </div>
        </div>

        {/* Messages */}
        <div className='flex-1 overflow-y-auto p-4 space-y-3'>
          <div className='flex flex-col items-start'>
            <div className='bg-gray-700 text-sm px-4 py-2 rounded-lg max-w-xs'>
              Hey! How are you?
            </div>
            <div className='bg-gray-700 text-sm px-4 py-2 rounded-lg max-w-xs mt-1'>
              Shall we go for Hiking this weekend?
            </div>
          </div>

          <div className='flex flex-col items-end'>
            <div className='bg-blue-600 text-sm px-4 py-2 rounded-lg max-w-xs'>
              I’m doing great! What about you?
            </div>
            <div className='bg-blue-600 text-sm px-4 py-2 rounded-lg max-w-xs mt-1'>
              Yes, that sounds amazing!
            </div>
          </div>
        </div>

        {/* Input */}
        <div className='p-4 border-t border-gray-700 flex items-center space-x-3'>
          <FaImage className='text-2xl cursor-pointer' />
          <BsPaperclip className='text-2xl cursor-pointer' />
          <FaMicrophone className='text-2xl cursor-pointer' />
          <input
            type='text'
            placeholder='Type a message...'
            className='flex-1 bg-gray-800 text-base px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <FiSend className='text-2xl cursor-pointer text-blue-500' />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
