import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setOnlineUsers, logoutUser } from './redux/features/userSlice.js';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import { addMessage } from './redux/features/messageSlice.js';
import useSocket from './hooks/useSocket.js';
import SessionExpiredModal from './components/SessionExpiredModal.jsx';
import { jwtDecode } from 'jwt-decode';

// Combined Protected Route Logic
const ProtectedRoute = ({ children }) => {
  const { authUser } = useSelector(store => store.user);

  // Redirect to login if there's no authenticated user
  if (!authUser) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

// Router Configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    )
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> }
]);

function App() {
  const { authUser } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const socket = useSocket(authUser?.data?.user?._id);
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  // Function to check JWT expiry
  const checkTokenExpiry = () => {
    const token = authUser?.data?.accessToken;
    if (token) {
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp < Date.now() / 1000;
      if (isExpired) {
        setIsSessionExpired(true); // Show pop-up
        dispatch(logoutUser()); // Logout the user
      }
    }
  };

  // Check token expiry on mount and every minute
  useEffect(() => {
    checkTokenExpiry();
    const interval = setInterval(checkTokenExpiry, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [authUser]);

  // Socket event listeners
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

  return (
    <>
      {/* RouterProvider wraps everything */}
      <RouterProvider router={router}>
        {/* Show session expired pop-up */}
        <SessionExpiredModal isOpen={isSessionExpired} onClose={() => setIsSessionExpired(false)} />
      </RouterProvider>
    </>
  );
}

export default App;
