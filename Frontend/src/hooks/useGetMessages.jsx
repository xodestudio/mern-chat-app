import { useEffect } from 'react';
import axios from 'axios';

const useGetMessages = () => {
  useEffect(async () => {
    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios(
          'http://localhost:8000/api/v1/messages/send/6782ab994c2008e4e81f720c',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
  }, []);
};

export default useGetMessages;
