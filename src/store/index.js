import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import signInModalReducer from "./SignInModalSlice";

export default configureStore({
  reducer: {
    user: authReducer,
    signInFormState: signInModalReducer
  }
});