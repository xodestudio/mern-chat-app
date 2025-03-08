import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

const initialState = {
  authUser: null,
  otherUsers: [],
  selectedUsers: null,
  onlineUsers: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUsers: (state, action) => {
      state.selectedUsers = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    logoutUser: state => {
      state.authUser = null;
      state.otherUsers = [];
      state.selectedUsers = null;
      state.onlineUsers = [];
      localStorage.removeItem('user');
    }
  },
  extraReducers: builder => {
    builder.addCase(REHYDRATE, state => {
      state.selectedUsers = null; // Reset selectedUsers on rehydration
    });
  }
});

export const { setAuthUser, setOtherUsers, setSelectedUsers, setOnlineUsers, logoutUser } =
  userSlice.actions;

export default userSlice.reducer;
