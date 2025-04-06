import { useCallback } from 'react';
import axiosInstance from '../axiosInstance.js';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../redux/features/messageSlice';
import useSocket from './useSocket';

const useSendMessage = () => {
  const dispatch = useDispatch();
  const { authUser, selectedUsers } = useSelector(store => store.user);
  const socket = useSocket(authUser.data.user._id);

  const sendMessage = useCallback(
    async formData => {
      if (!formData) {
        console.error('FormData is empty or undefined');
        return;
      }

      try {
        // Extract message and file from FormData
        const message = formData.get('message');
        const file = formData.get('file');

        // Create a new message object
        const newMessage = {
          senderId: authUser.data.user._id,
          receiverId: selectedUsers._id,
          message: message || null, // Handle case where message is empty
          file: file || null, // Handle case where file is empty
          createdAt: new Date().toISOString()
        };

        // Send message via socket
        if (socket) {
          socket.emit('sendMessage', newMessage);
        }

        // Send message to the server
        const response = await axiosInstance.post(
          `http://localhost:8000/api/v1/messages/send-message/${selectedUsers._id}`,
          formData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        // Update Redux state with the new message
        dispatch(addMessage(response.data.data));
      } catch (error) {
        console.error('Error sending message:', error);
      }
    },
    [authUser, selectedUsers, socket, dispatch]
  );

  return sendMessage;
};

export default useSendMessage;
