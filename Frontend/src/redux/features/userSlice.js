import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authUser: null,
  otherUsers: [],
  selectedUser: null,
  onlineUsers: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set the authenticated user
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },

    // Set the list of other users
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },

    // Set the currently selected user for chat
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    // Set the list of online users
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

    // Handle logout
    logoutUser: state => {
      state.authUser = null;
      state.otherUsers = [];
      state.selectedUser = null;
      state.onlineUsers = [];
      localStorage.removeItem('user');
    }
  }
});

// Export actions
export const { setAuthUser, setOtherUsers, setSelectedUser, setOnlineUsers, logoutUser } =
  userSlice.actions;

// Export reducer
export default userSlice.reducer;
