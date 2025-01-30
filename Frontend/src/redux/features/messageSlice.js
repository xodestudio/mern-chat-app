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
    }
  }
});

export const { setMessages } = messageSlice.actions;

export default messageSlice.reducer;
