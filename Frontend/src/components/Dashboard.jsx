import React, { useEffect, useRef, useState } from 'react';
import {
  AiOutlineVideoCamera,
  AiOutlinePhone,
  AiOutlineInfoCircle,
  AiOutlineSearch
} from 'react-icons/ai';
import { FaMicrophone, FaImage } from 'react-icons/fa';
import { BsPaperclip } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUsers } from '../redux/features/userSlice.js';
import Profile from './Profile';
import useGetMessages from '../hooks/useGetMessages.jsx';
import axios from 'axios';
import { setMessages } from '../redux/features/messageSlice.js';
import Message from './Message';
import DefaultHomePage from './DefaultHomePage.jsx';

const Dashboard = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [message, setMessage] = useState('');
  const { authUser, otherUsers, selectedUsers, onlineUsers } = useSelector(store => store.user);

  const dispatch = useDispatch();
  const scroll = useRef(null);
  const { messages } = useSelector(store => store.message);
  if (!messages) return null;

  useGetMessages();
  useGetOtherUsers();

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const selectedUserHandler = user => {
    dispatch(setSelectedUsers(user));
  };

  const handleChange = e => {
    setMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const submitHandler = async e => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `http://localhost:8000/api/v1/messages/send-message/${selectedUsers?._id}`,
        { message }
      );
      dispatch(setMessages([...messages, response.data.data]));
    } catch (error) {
      console.log(error);
    }
    setMessage('');
    setIsTyping(false);
  };

  return (
    <div className='overflow-auto h-screen flex flex-col md:flex-row bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-300 font-poppins'>
      {/* Sidebar */}
      <aside className='w-full md:w-1/4 lg:w-1/5 xl:w-1/6 bg-gray-800 border-r border-gray-700'>
        <div className='p-4 md:p-6 flex justify-between items-center border-b border-gray-700'>
          <h1 className='text-xl md:text-2xl font-bold text-white'>Messenger</h1>
          <HiOutlinePencilAlt
            className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white'
            onClick={() => setShowProfile(true)}
          />
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

        {/* Search Bar */}
        <div className='p-4 md:p-6 border-b border-gray-700'>
          <div className='flex items-center space-x-3 bg-gray-700 rounded-full px-4 py-2'>
            <AiOutlineSearch className='text-xl text-gray-400' />
            <input
              type='text'
              placeholder='Search...'
              className='flex-1 bg-transparent text-sm md:text-base text-white focus:outline-none'
            />
          </div>
        </div>

        {/* Chat List */}
        <div className='overflow-y-auto h-[calc(100vh-280px)] md:h-[calc(100vh-320px)] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 modern-scrollbar'>
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
                  {/* Green circle for online users */}
                  {onlineUsers?.includes(user._id.trim()) ? (
                    <div className='absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-gray-900'></div>
                  ) : null}
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
          <section className='h-screen flex-1 flex flex-col'>
            {/* Header */}
            {selectedUsers ? (
              <div className='p-4 md:p-6 flex items-center justify-between border-b border-gray-700 bg-gray-800'>
                <div className='flex items-center space-x-3 md:space-x-4'>
                  <img
                    src={selectedUsers?.avatar}
                    alt='Avatar'
                    className='w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-700'
                  />
                  <div>
                    <h2 className='text-sm md:text-base font-semibold text-white'>
                      {selectedUsers?.username}
                    </h2>
                    <p className='text-xs md:text-sm text-gray-400'>Active 1h ago</p>
                  </div>
                </div>
                <div className='flex items-center space-x-4 md:space-x-6'>
                  <AiOutlineVideoCamera className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
                  <AiOutlinePhone className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
                  <AiOutlineInfoCircle className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
                </div>
              </div>
            ) : null}

            {/* Main Content */}
            <div className='flex-1 overflow-y-auto p-4 md:p-6 bg-gray-900 modern-scrollbar'>
              {/* Default Home Page or Chat Messages */}
              {!selectedUsers ? (
                <DefaultHomePage />
              ) : (
                <>
                  {/* Render Messages */}
                  <div className='flex flex-col space-y-2 md:space-y-3'>
                    {messages?.map((message, index) => {
                      const senderAvatar =
                        message.senderId === authUser.data.user._id
                          ? authUser.data.user.avatar
                          : otherUsers.find(user => user._id === message.senderId)?.avatar;

                      return (
                        <Message
                          key={index}
                          message={message}
                          isLoggedInUser={authUser && message.senderId === authUser.data.user._id}
                          senderAvatar={senderAvatar}
                        />
                      );
                    })}
                  </div>

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className='text-xs md:text-sm text-gray-400 mt-4'>
                      <span>Typing...</span>
                    </div>
                  )}

                  {/* This div will be scrolled into view */}
                  <div ref={scroll}></div>
                </>
              )}
            </div>

            {/* Input */}
            {selectedUsers && (
              <form
                onSubmit={submitHandler}
                className='p-4 md:p-6 border-t border-gray-700 flex items-center space-x-4 md:space-x-6 bg-gray-800'
              >
                <FaImage className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
                <BsPaperclip className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
                <FaMicrophone className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
                <input
                  value={message}
                  onChange={handleChange}
                  type='text'
                  placeholder='Type a message...'
                  className='flex-1 bg-gray-700 text-sm md:text-base px-4 py-2 md:px-5 md:py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white'
                />
                <button type='submit'>
                  <FiSend className='text-xl md:text-2xl cursor-pointer text-blue-500 hover:text-blue-400' />
                </button>
              </form>
            )}
          </section>
        )}

        {/* Profile Section */}
        {showProfile && <Profile onClose={() => setShowProfile(false)} />}
      </div>
    </div>
  );
};

export default Dashboard;
