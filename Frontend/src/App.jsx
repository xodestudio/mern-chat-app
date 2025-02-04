import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Profile from './components/Profile.jsx';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { setOnlineUsers } from './redux/features/userSlice.js';
import { setSocket } from './redux/features/socketSlice.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }
]);

function App() {
  const { authUser } = useSelector(store => store.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socket = io('http://localhost:8000', {
        withCredentials: true,
        transports: ['websocket', 'polling'],
        query: { userId: authUser._id }
      });

      dispatch(setSocket({ id: socket.id }));

      socket.on('getOnlineUsers', onlineUsers => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [authUser]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
