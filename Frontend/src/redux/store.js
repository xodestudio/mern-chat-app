import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import messageReducer from './features/messageSlice';

// Middleware for logging Redux actions (optional, for debugging purposes)
const loggerMiddleware = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

// Configure the Redux store
export const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(loggerMiddleware), // Add logger middleware
  devTools: import.meta.env.MODE !== 'production'
});

// Export the store
export default store;
