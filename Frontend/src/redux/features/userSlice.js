import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authUser: null,
  otherUsers: []
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
    }
  }
});

export const { setAuthUser, setOtherUsers } = userSlice.actions;

export default userSlice.reducer;
