import { useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../redux/features/messageSlice';
import useSocket from './useSocket';

const useSendMessage = () => {
  const dispatch = useDispatch();
  const { authUser, selectedUsers } = useSelector(store => store.user);
  const socket = useSocket(authUser.data.user._id);

  const sendMessage = useCallback(
    async message => {
      if (!message) {
        console.error('Message is empty or undefined');
        return;
      }

      try {
        const newMessage = {
          senderId: authUser.data.user._id,
          receiverId: selectedUsers._id,
          message
        };

        // Send message via socket
        if (socket) {
          socket.emit('sendMessage', newMessage);
        }

        const response = await axios.post(
          `http://localhost:8000/api/v1/messages/send-message/${selectedUsers._id}`,
          newMessage,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
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
