import { useEffect } from 'react';
import axios from '../axiosConfig';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/features/userSlice';

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get('http://localhost:8000/api/v1/users/other-users');

        dispatch(setOtherUsers(response.data.data));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
