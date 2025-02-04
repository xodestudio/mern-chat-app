import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice.js';
import messageReducer from './features/messageSlice.js';
import socketReducer from './features/socketSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    socket: socketReducer
  }
});
