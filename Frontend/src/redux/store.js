import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice.js';
import messageReducer from './features/messageSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer
  }
});

export default store;
