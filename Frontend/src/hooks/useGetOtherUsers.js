import { useEffect } from 'react';
import axiosInstance from '../axiosInstance.js';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/features/userSlice';

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axiosInstance.defaults.withCredentials = true;
        const response = await axiosInstance.get('http://localhost:8000/api/v1/users/other-users');

        dispatch(setOtherUsers(response.data.data));
      } catch (error) {
        if (error.response?.status === 401) {
          // JWT expired, log out the user
          dispatch(logoutUser());
          window.location.href = '/login'; // Redirect to login page
        } else {
          console.error('Error fetching users:', error);
        }
      }
    };

    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
