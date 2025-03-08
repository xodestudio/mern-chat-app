import { useEffect, useRef, useState, useCallback } from 'react';
import {
  AiOutlineVideoCamera,
  AiOutlinePhone,
  AiOutlineInfoCircle,
  AiOutlineSearch
} from 'react-icons/ai';
import { PiDotsThreeOutlineVerticalDuotone } from 'react-icons/pi';
import { FaMicrophone, FaImage, FaSmile } from 'react-icons/fa';
import { BsPaperclip } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import EmojiPicker from 'emoji-picker-react';
import useGetOtherUsers from '../hooks/useGetOtherUsers.js';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUsers } from '../redux/features/userSlice.js';
import Profile from './Profile.jsx';
import useGetMessages from '../hooks/useGetMessages.js';
import axios from 'axios';
import { setMessages } from '../redux/features/messageSlice.js';
import Message from './Message.jsx';
import DefaultHomePage from './DefaultHomePage.jsx';
import useSendMessage from '../hooks/useSendMessage.js';
import useSocket from '../hooks/useSocket.js';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { authUser, otherUsers, selectedUsers, onlineUsers } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const scroll = useRef(null);
  const sidebarRef = useRef(null);
  const sendMessage = useSendMessage();
  const { messages } = useSelector(store => store.message);
  const socket = useSocket(authUser?.data?.user?._id);

  // Truncate message for preview
  const truncateMessage = (message, maxLength) => {
    if (!message) return '';
    return message.length > maxLength ? `${message.slice(0, maxLength)}...` : message;
  };

  // Filter users based on search query
  const filteredUsers = otherUsers.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useGetMessages();
  useGetOtherUsers();

  useEffect(() => {
    if (!socket) return;
    // Listen for typing events from the server
    socket.on('typing', data => {
      if (data.senderId === selectedUsers?._id) {
        setIsTyping(true);
      }
    });
    // Listen for stop typing events
    socket.on('stopTyping', data => {
      if (data.senderId === selectedUsers?._id) {
        setIsTyping(false);
      }
    });
    return () => {
      socket.off('typing');
      socket.off('stopTyping');
    };
  }, [socket, selectedUsers]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessage(message);
    setMessage('');
    // Notify the server that typing has stopped
    socket?.emit('stopTyping', { senderId: authUser.data.user._id });
  };

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedUserHandler = useCallback(
    user => {
      dispatch(setSelectedUsers(user));
      setIsSidebarVisible(false); // Close sidebar after selecting a user on small screens
    },
    [dispatch]
  );

  const handleChange = e => {
    setMessage(e.target.value);
    // Notify the server that the user is typing
    if (e.target.value.trim()) {
      socket?.emit('typing', { senderId: authUser.data.user._id });
    } else {
      socket?.emit('stopTyping', { senderId: authUser.data.user._id });
    }
  };

  const handleEmojiClick = emojiObject => {
    setMessage(prevMessage => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const submitHandler = async e => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      axios.defaults.withCredentials = true;
      const formData = new FormData();
      if (message) formData.append('message', message);
      const response = await axios.post(
        `http://localhost:8000/api/v1/messages/send-message/${selectedUsers?._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      dispatch(setMessages([...messages, response.data.data]));
    } catch (error) {
      console.log(error);
    }
    setMessage('');
    setIsTyping(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className='overflow-auto h-screen flex flex-col md:flex-row bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-300 font-poppins'
    >
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out z-20 ${
          isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative xl:w-1/6`}
      >
        <div className='p-4 md:p-6 flex justify-between items-center border-b border-gray-700'>
          <h1 className='text-xl md:text-2xl font-bold text-white'>Messenger</h1>
          <HiOutlinePencilAlt
            className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white'
            onClick={() => setShowProfile(true)}
          />
        </div>
        {/* Search Bar */}
        <div className='p-4 md:p-6 border-b border-gray-700'>
          <motion.div
            className='flex items-center space-x-3 bg-gray-700 rounded-full px-4 py-2'
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <AiOutlineSearch className='text-xl text-gray-400' />
            <input
              type='text'
              placeholder='Search...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='flex-1 bg-transparent text-sm md:text-base text-white focus:outline-none'
            />
          </motion.div>
        </div>
        {/* Chat List */}
        <div className='flex-1 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 modern-scrollbar max-h-[calc(100vh-200px)]'>
          {filteredUsers && filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <motion.div
                key={user._id}
                onClick={() => selectedUserHandler(user)}
                className={`p-3 md:p-4 flex items-center space-x-3 md:space-x-4 hover:bg-gray-700 cursor-pointer transition-colors duration-200 ${
                  selectedUsers?._id === user._id ? 'bg-gray-700' : ''
                }`}
                whileHover={{ scale: 1.02, backgroundColor: '#333' }}
                transition={{ duration: 0.3 }}
              >
                <div className='relative'>
                  <img
                    src={user.avatar}
                    alt='Avatar'
                    className='w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-gray-700'
                  />
                  {user.unreadMessagesCount > 0 && (
                    <div className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                      {user.unreadMessagesCount}
                    </div>
                  )}
                  {onlineUsers?.includes(user._id.trim()) ? (
                    <div className='absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-gray-900'></div>
                  ) : null}
                </div>
                {/* Username and Latest Message */}
                <div>
                  <h2 className='text-sm md:text-base font-semibold text-white'>{user.username}</h2>
                  <p className='text-xs md:text-sm text-gray-400'>
                    {truncateMessage(user.latestMessage, 20)}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className='p-4 text-center text-gray-500'>No users available.</div>
          )}
        </div>
      </aside>
      {/* Main Content */}
      <motion.div className='flex-1 flex flex-col'>
        {/* Toggle Icon for Medium and Small Screens */}
        <div className='md:hidden p-4 flex justify-between items-center border-b border-gray-700'>
          <h1 className='text-xl font-bold text-white'>Messenger</h1>
          <button
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            className='text-gray-400 hover:text-white'
          >
            <PiDotsThreeOutlineVerticalDuotone className='text-xl cursor-pointer' />
          </button>
        </div>
        {/* Chat Window */}
        {!showProfile && (
          <section className='h-screen flex-1 flex flex-col'>
            {/* Header */}
            {selectedUsers ? (
              <motion.div
                className='p-4 md:p-6 flex items-center justify-between border-b border-gray-700 bg-gray-800'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
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
                    <p className='text-xs md:text-sm text-gray-400'>
                      {onlineUsers?.includes(selectedUsers._id.trim()) ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className='flex items-center space-x-4 md:space-x-6'>
                  <AiOutlineVideoCamera className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
                  <AiOutlinePhone className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
                  <AiOutlineInfoCircle className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
                </div>
              </motion.div>
            ) : null}

            {/* Main Content */}
            <div className='flex-1 overflow-y-auto bg-gray-900 modern-scrollbar'>
              {!selectedUsers ? (
                <DefaultHomePage />
              ) : (
                <>
                  <div className='p-4 flex flex-col space-y-2 md:space-y-3'>
                    {messages.length > 0 ? (
                      messages.map((message, index) => {
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
                      })
                    ) : (
                      <div className='flex flex-col items-center justify-center h-full text-center space-y-6'>
                        {/* Improved SVG Icon */}
                        <motion.div
                          className='p-4 bg-gray-800 rounded-full shadow-lg'
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                            className='size-12 text-gray-400'
                          >
                            <path d='M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z' />
                            <path d='M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z' />
                          </svg>
                        </motion.div>

                        {/* Main Text */}
                        <motion.div
                          className='text-gray-400 text-xl font-semibold'
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          No messages yet.
                        </motion.div>

                        {/* Subtext */}
                        <motion.div
                          className='text-gray-500 text-sm max-w-xs'
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          Start chatting with your friends now! Share your thoughts, images, or even
                          voice messages.
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      className='flex items-center space-x-2 text-gray-400 text-sm mt-2 px-4'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Unique Typing Text */}
                      <span className='typing-text'>Typing</span>

                      {/* Animated Dots */}
                      <div className='flex space-x-1'>
                        {[1, 2, 3].map((_, index) => (
                          <motion.div
                            key={index}
                            className='w-1.5 h-1.5 bg-gray-400 rounded-full'
                            animate={{
                              y: [0, -5, 0],
                              transition: { repeat: Infinity, duration: 0.5, delay: index * 0.1 }
                            }}
                          ></motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

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
                {/* Image Icon */}
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                  <FaImage className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
                </motion.div>

                {/* Attachment Icon */}
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                  <BsPaperclip className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
                </motion.div>

                {/* Emoji Icon */}
                <div className='relative'>
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                    <FaSmile
                      className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white'
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    />
                  </motion.div>
                  {showEmojiPicker && (
                    <div className='absolute bottom-10 left-0 z-10'>
                      <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                  )}
                </div>

                {/* Input Field with Microphone Icon inside */}
                <div className='flex-1 relative'>
                  <input
                    value={message}
                    onChange={handleChange}
                    type='text'
                    placeholder='Type a message...'
                    className='w-full bg-gray-700 text-sm md:text-base px-4 py-2 md:px-5 md:py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white pr-12'
                  />
                  {/* Microphone Icon inside Input */}
                  <motion.div>
                    <FaMicrophone className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white absolute right-4 top-1/2 transform -translate-y-1/2' />
                  </motion.div>
                </div>

                {/* Send Button */}
                <motion.button
                  type='submit'
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiSend className='text-xl md:text-2xl cursor-pointer text-blue-500 hover:text-blue-400' />
                </motion.button>
              </form>
            )}
          </section>
        )}

        {/* Profile Section */}
        {showProfile && <Profile onClose={() => setShowProfile(false)} />}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
