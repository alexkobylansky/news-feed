import {createSlice} from "@reduxjs/toolkit";

const SignInModalSlice = createSlice({
  name: "signInFormState",
  initialState: {
    signInFormIsOpen: false
  },
  reducers: {
    signInFormOpen(state, action) {
      state.signInFormIsOpen = action.payload.signInFormIsOpen
    },
    signInFormClose(state, action) {
      state.signInFormIsOpen = action.payload.signInFormIsOpen
    }
  }
});

export const {signInFormOpen, signInFormClose} = SignInModalSlice.actions;

export default SignInModalSlice.reducer;