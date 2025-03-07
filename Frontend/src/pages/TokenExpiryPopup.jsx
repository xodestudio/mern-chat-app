import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/features/userSlice';
import axios from 'axios';

const TokenExpiryPopup = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(state => state.user.authUser);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const checkTokenExpiry = async () => {
      if (authUser && authUser.accessToken) {
        const decodedToken = jwt.decode(authUser.accessToken);
        const expiryTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        const timeLeft = expiryTime - currentTime;

        if (timeLeft < 60000 && timeLeft > 0) {
          setShowPopup(true);
        }
      }
    };

    const interval = setInterval(checkTokenExpiry, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [authUser]);

  const handleRefreshToken = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/users/refresh-token',
        {},
        { withCredentials: true }
      );

      if (response.data.accessToken) {
        dispatch(setAuthUser(response.data));
        setShowPopup(false);
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      setShowPopup(false);
      window.location.href = '/login';
    }
  };

  return (
    showPopup && (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <h2 className='text-xl font-bold mb-4'>Session Expiring Soon</h2>
          <p className='mb-4'>Your session is about to expire. Do you want to continue?</p>
          <div className='flex justify-end space-x-4'>
            <button
              onClick={handleRefreshToken}
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
              Continue
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default TokenExpiryPopup;
