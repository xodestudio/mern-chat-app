import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage if available
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('userState');
    if (serializedState === null) {
      return {
        authUser: null,
        otherUsers: [],
        selectedUsers: null,
        onlineUsers: []
      };
    }
    const parsedState = JSON.parse(serializedState);
    parsedState.selectedUsers = null;
    return parsedState;
  } catch (err) {
    return {
      authUser: null,
      otherUsers: [],
      selectedUsers: null,
      onlineUsers: []
    };
  }
};

const initialState = loadState();

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
      localStorage.setItem('userState', JSON.stringify(state));
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
      localStorage.setItem('userState', JSON.stringify(state));
    },
    setSelectedUsers: (state, action) => {
      state.selectedUsers = action.payload;
      localStorage.setItem('userState', JSON.stringify(state));
    },
    resetSelectedUsers: state => {
      state.selectedUsers = null;
      localStorage.setItem('userState', JSON.stringify(state));
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
      localStorage.setItem('userState', JSON.stringify(state));
    },
    logoutUser: state => {
      state.authUser = null;
      state.otherUsers = [];
      state.selectedUsers = null;
      state.onlineUsers = [];
      localStorage.removeItem('userState');
    }
  }
});

export const {
  setAuthUser,
  setOtherUsers,
  setSelectedUsers,
  setOnlineUsers,
  logoutUser,
  resetSelectedUsers
} = userSlice.actions;

export default userSlice.reducer;
