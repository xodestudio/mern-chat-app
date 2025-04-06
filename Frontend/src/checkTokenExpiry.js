import { logoutUser } from './redux/features/userSlice';
import { jwtDecode } from 'jwt-decode';

/*
  Checks if a JWT token is expired.
  @param {string} token - The JWT token to check.
  @returns {boolean} - True if the token is expired or invalid, false otherwise.
 */
export const isTokenExpired = token => {
  if (!token) return true; // No token means it's "expired"

  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000; // Check if token is expired
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Treat invalid tokens as expired
  }
};

/*
  Middleware to check token expiry on specific actions.
  @param {object} store - The Redux store.
  @returns {function} - The middleware function.
 */
export const checkTokenExpiryMiddleware = store => next => action => {
  const state = store.getState();
  const token = state.user.authUser?.data?.accessToken;

  // Check token expiry only for specific actions (e.g., API calls or auth-related actions)
  const actionsToCheck = ['api/callRequest', 'user/loginSuccess']; // Add relevant action types
  if (actionsToCheck.includes(action.type) && token && isTokenExpired(token)) {
    store.dispatch(logoutUser());

    // Use client-side routing for redirection (e.g., React Router)
    if (window.location.pathname !== '/login') {
      window.location.href = '/login'; // Fallback to hard redirect if needed
    }
  }

  return next(action);
};
