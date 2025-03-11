import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  addMessage,
  setMessages,
  setUnreadCount,
  setLatestMessage
} from '../redux/features/messageSlice';
import useSocket from './useSocket.js';

const useGetMessages = () => {
  const { selectedUsers, authUser } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const socket = useSocket(authUser.data.user._id);

  // Fetch old messages when a user is selected
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!selectedUsers?._id) return;

        axios.defaults.withCredentials = true;
        const response = await axios.post(
          `http://localhost:8000/api/v1/messages/get-message/${selectedUsers._id}`
        );

        const { messages, unreadMessagesCount, latestMessage } = response.data.data;

        dispatch(setMessages(messages));
        dispatch(setUnreadCount({ userId: selectedUsers._id, count: unreadMessagesCount }));
        dispatch(setLatestMessage({ userId: selectedUsers._id, message: latestMessage }));
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (selectedUsers?._id) {
      fetchMessages();
    }
  }, [selectedUsers, dispatch]);

  // Mark messages as read when a chat is opened
  useEffect(() => {
    const markMessagesAsRead = async () => {
      try {
        if (!selectedUsers?._id) return;

        axios.defaults.withCredentials = true;
        await axios.post(
          `http://localhost:8000/api/v1/messages/mark-messages-as-read/${selectedUsers._id}`
        );

        dispatch(setUnreadCount({ userId: selectedUsers._id, count: 0 }));
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    };

    if (selectedUsers?._id) {
      markMessagesAsRead();
    }
  }, [selectedUsers, dispatch]);

  // Listen for real-time messages
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = newMessage => {
      dispatch(addMessage(newMessage));

      // Update unread count and latest message for the sender
      if (newMessage.senderId !== authUser.data.user._id) {
        dispatch(setUnreadCount({ userId: newMessage.senderId, count: 1, increment: true }));
        dispatch(setLatestMessage({ userId: newMessage.senderId, message: newMessage }));
      }
    };

    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [socket, dispatch, authUser]);
};

export default useGetMessages;
