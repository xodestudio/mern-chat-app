import { useEffect } from 'react';
import axiosInstance from '../axiosInstance.js';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setMessages } from '../redux/features/messageSlice';
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

        axiosInstance.defaults.withCredentials = true;
        const response = await axiosInstance.post(
          `http://localhost:8000/api/v1/messages/get-message/${selectedUsers._id}`
        );

        const { messages } = response.data.data;

        dispatch(setMessages(messages));
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (selectedUsers?._id) {
      fetchMessages();
    }
  }, [selectedUsers, dispatch]);

  // Listen for real-time messages
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = newMessage => {
      dispatch(addMessage(newMessage));
    };

    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [socket, dispatch, authUser]);
};

export default useGetMessages;
