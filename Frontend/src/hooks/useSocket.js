import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useSocket = userId => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const newSocket = io('http://localhost:8000', {
      withCredentials: true,
      query: { userId }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  return socket;
};

export default useSocket;
