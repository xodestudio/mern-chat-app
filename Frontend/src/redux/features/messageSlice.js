import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: []
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
    }
  }
});

export const { addMessage, setMessages } = messageSlice.actions;

export default messageSlice.reducer;
