import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authUser: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser += action.payload;
    }
  }
});

export const { setAuthUser } = userSlice.actions;

export default userSlice.reducer;
