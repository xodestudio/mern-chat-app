import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { logoutUser } from './redux/features/userSlice';
import store from './redux/store';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const token = store.getState().user.authUser?.data?.accessToken;

    if (token) {
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp < Date.now() / 1000;

      if (isExpired) {
        store.dispatch(logoutUser()); // Log out the user
        navigate('/login');
        return Promise.reject(new Error('JWT expired'));
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
