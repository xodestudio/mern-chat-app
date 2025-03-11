import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  unreadCounts: {},
  latestMessages: {}
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setUnreadCount: (state, action) => {
      const { userId, count } = action.payload;
      state.unreadCounts[userId] = count;
    },
    setLatestMessage: (state, action) => {
      const { userId, message } = action.payload;
      state.latestMessages[userId] = message;
    }
  }
});

export const { addMessage, setMessages, setUnreadCount, setLatestMessage } = messageSlice.actions;

export default messageSlice.reducer;
