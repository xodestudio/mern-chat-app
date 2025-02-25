import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setOnlineUsers } from './redux/features/userSlice.js';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import { addMessage } from './redux/features/messageSlice.js';
import useSocket from './hooks/useSocket.js';

const router = createBrowserRouter([
  { path: '/', element: <Dashboard /> },
  { path: '/profile', element: <Profile /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> }
]);

function App() {
  const { authUser } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const socket = useSocket(authUser?.data?.user?._id);

  useEffect(() => {
    if (!socket) return;

    socket.on('getOnlineUsers', onlineUsers => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on('receiveMessage', message => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off('getOnlineUsers');
      socket.off('receiveMessage');
    };
  }, [socket, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
