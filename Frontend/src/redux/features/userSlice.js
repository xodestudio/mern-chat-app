import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authUser: null,
  otherUsers: [],
  selectedUsers: null,
  onlineUsers: null
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
    }
  }
});

export const { setAuthUser, setOtherUsers, setSelectedUsers, setOnlineUsers } = userSlice.actions;

export default userSlice.reducer;
