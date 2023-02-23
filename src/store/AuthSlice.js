import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null
  },
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout(state, action) {
      state.user = action.payload.user;
      localStorage.removeItem('user');
    }
  }
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;