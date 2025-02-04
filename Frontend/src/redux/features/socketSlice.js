import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  socketId: null
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socketId = action.payload?.id || null;
    }
  }
});

export const { setSocket } = socketSlice.actions;

export default socketSlice.reducer;
