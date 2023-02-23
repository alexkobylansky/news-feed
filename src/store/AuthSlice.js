import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false
  },
  reducers: {
    login(state, action) {
      state.isAuth = action.payload.isAuth
    },
    logout(state, action) {
      state.isAuth = action.payload.isAuth
    }
  }
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;