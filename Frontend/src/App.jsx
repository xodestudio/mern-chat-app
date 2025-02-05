import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { setOnlineUsers } from './redux/features/userSlice.js';
import { setSocket } from './redux/features/socketSlice.js';
import Dashboard from './components/Dashboard.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Profile from './components/Profile.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Dashboard /> },
  { path: '/profile', element: <Profile /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> }
]);

function App() {
  const { authUser } = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let socket;
    if (authUser?.data?.user?._id) {
      socket = io('http://localhost:8000', {
        withCredentials: true,
        query: { userId: authUser.data.user._id }
      });

      dispatch(setSocket({ id: socket.id }));

      socket.on('getOnlineUsers', onlineUsers => {
        dispatch(setOnlineUsers(onlineUsers));
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
        dispatch(setSocket(null));
      }
    };
  }, [authUser, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
