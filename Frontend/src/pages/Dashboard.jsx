import { useEffect, useRef, useState, useCallback } from 'react';
import { PiDotsThreeOutlineVerticalDuotone } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUsers } from '../redux/features/userSlice';
import {
  addMessage,
  setLatestMessage,
  setMessages,
  setUnreadCount
} from '../redux/features/messageSlice';
import axios from 'axios';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import useGetMessages from '../hooks/useGetMessages';
import useSendMessage from '../hooks/useSendMessage';
import useSocket from '../hooks/useSocket';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar/Sidebar';
import ChatHeader from '../components/ChatWindow/ChatHeader';
import MessageList from '../components/ChatWindow/MessageList';
import TypingIndicator from '../components/ChatWindow/TypingIndicator';
import InputArea from '../components/ChatWindow/InputArea';
import Profile from './Profile';
import DefaultHomePage from './DefaultHomePage';

const Dashboard = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const { authUser, otherUsers, selectedUsers, onlineUsers } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const scroll = useRef(null);
  const sidebarRef = useRef(null);
  const sendMessage = useSendMessage();
  const { messages } = useSelector(store => store.message);
  const socket = useSocket(authUser?.data?.user?._id);

  const filteredUsers = otherUsers.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const fileInputRef = useRef(null);

  const handlePaperclipClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useGetMessages();
  useGetOtherUsers();

  useEffect(() => {
    if (!socket) return;
    socket.on('typing', data => {
      if (data.senderId === selectedUsers?._id) {
        setIsTyping(true);
      }
    });
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

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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
      setIsSidebarVisible(false);
    },
    [dispatch]
  );

  const handleChange = e => {
    setMessage(e.target.value);
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
    if (!message.trim() && !selectedFile) return;
    try {
      const formData = new FormData();
      if (message) formData.append('message', message);
      if (selectedFile) formData.append('file', selectedFile);

      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `http://localhost:8000/api/v1/messages/send-message/${selectedUsers?._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // Update Redux state with the new message
      dispatch(addMessage(response.data.data));

      setMessage('');
      setSelectedFile(null);

      // Emit event to the server
      socket?.emit('stopTyping', { senderId: authUser.data.user._id });
    } catch (error) {
      console.log(error);
    }
  };

  // Function to format the date
  const formatDate = date => {
    const today = new Date();
    const messageDate = new Date(date);

    // Check if the message is from today
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    }

    // Check if the message is from yesterday
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }

    // Check if the message is from this week
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    if (messageDate >= startOfWeek) {
      return messageDate.toLocaleDateString([], { weekday: 'long' }); // e.g., Monday, Tuesday
    }

    // For older messages, return the full date
    return messageDate.toLocaleDateString(); // e.g., 04/03/2025
  };

  // Group messages by date
  const groupedMessages = messages.reduce((acc, message) => {
    const date = new Date(message.createdAt).toDateString(); // Group by date
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className='overflow-auto h-screen flex flex-col md:flex-row bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-300 font-poppins'
    >
      <Sidebar
        isSidebarVisible={isSidebarVisible}
        setShowProfile={setShowProfile}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredUsers={filteredUsers}
        selectedUserHandler={selectedUserHandler}
        selectedUsers={selectedUsers}
        onlineUsers={onlineUsers}
        sidebarRef={sidebarRef}
      />

      <motion.div className='flex-1 flex flex-col'>
        <div className='md:hidden p-4 flex justify-between items-center border-b border-gray-700'>
          <h1 className='text-xl font-bold text-white'>Messenger</h1>
          <button
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            className='text-gray-400 hover:text-white'
          >
            <PiDotsThreeOutlineVerticalDuotone className='text-xl cursor-pointer' />
          </button>
        </div>

        {!showProfile && (
          <section className='h-screen flex-1 flex flex-col'>
            {selectedUsers && (
              <ChatHeader selectedUsers={selectedUsers} onlineUsers={onlineUsers} />
            )}

            <div className='flex-1 overflow-y-auto bg-gray-900 modern-scrollbar'>
              {!selectedUsers ? (
                <DefaultHomePage />
              ) : (
                <>
                  {/* Render grouped messages */}
                  {Object.entries(groupedMessages).map(([date, messages]) => (
                    <div key={date}>
                      {/* Display the date */}
                      <div className='text-center text-xs text-gray-500 my-2'>
                        {formatDate(messages[0].createdAt)}
                      </div>

                      {/* Render messages for this date */}
                      <MessageList
                        messages={messages} // Pass the messages array
                        authUser={authUser}
                        otherUsers={otherUsers}
                      />
                    </div>
                  ))}

                  <TypingIndicator isTyping={isTyping} />
                  <div ref={scroll}></div>
                </>
              )}
            </div>

            {selectedUsers && (
              <InputArea
                message={message}
                handleChange={handleChange}
                handleSubmit={submitHandler}
                handlePaperclipClick={handlePaperclipClick}
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                showEmojiPicker={showEmojiPicker}
                setShowEmojiPicker={setShowEmojiPicker}
                handleEmojiClick={handleEmojiClick}
              />
            )}
          </section>
        )}

        {showProfile && <Profile onClose={() => setShowProfile(false)} />}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
