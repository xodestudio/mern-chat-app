import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/features/messageSlice.js';

const useGetMessages = () => {
  const { selectedUsers } = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(
          `http://localhost:8000/api/v1/messages/get-message/${selectedUsers?._id}`
        );

        dispatch(setMessages(res.data.data));
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedUsers?._id) {
      fetchMessages();
    }
  }, [selectedUsers]);
};

export default useGetMessages;
