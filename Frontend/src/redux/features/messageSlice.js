import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: []
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    // Set all messages (e.g., when fetching messages from the server)
    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    // Add a new message
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    // Update the "seen" status of a message
    updateMessageSeenStatus: (state, action) => {
      const messageId = action.payload;
      const message = state.messages.find(msg => msg._id === messageId);
      if (message) {
        message.seen = true;
      }
    }
  }
});

// Export actions
export const { setMessages, addMessage, updateMessageSeenStatus } = messageSlice.actions;

// Export reducer
export default messageSlice.reducer;
