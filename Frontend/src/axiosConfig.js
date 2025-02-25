import axios from 'axios';
import { store } from './redux/store';
import { setAuthUser, logoutUser } from './redux/features/userSlice';

// Base URL for API requests
axios.defaults.baseURL = 'http://localhost:8000/api/v1';
axios.defaults.withCredentials = true; // Enable cookies for authentication

// Axios interceptor for token refresh
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token (401 Unauthorized)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the access token
        const response = await axios.post('/users/refresh-token', {}, { withCredentials: true });

        if (response.data.accessToken) {
          // Update the Authorization header with the new access token
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;

          // Update the Redux store with the new tokens
          store.dispatch(setAuthUser(response.data));

          // Retry the original request with the new token
          return axios(originalRequest);
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        // Logout the user if token refresh fails
        store.dispatch(logoutUser());
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
