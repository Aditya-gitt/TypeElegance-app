import { createSlice } from "@reduxjs/toolkit";
import {
  USER_EXISTS,
  GOOGLE_PROVIDER_NOT_AVAILABLE,
  EMAIL_PROVIDER_NOT_AVAILABLE,
  FIREBASE_USER_EXISTS_ERROR as FIREBASE_USER_EXISTS_ERROR,
  AUTHENTICATED,
  SIGNUP_ERROR,
  SIGNUP_COMPLETED,
} from "../constants/firebase_constants";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    CHANGE_USER: (state, action) => {
      state.user = action.payload.user;
    },
    AUTHENTICATION_SUCCESS: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    AUTHENTICATION_FAIL: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    LOG_OUT: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const {
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAIL,
  CHANGE_USER,
  LOG_OUT,
} = authSlice.actions;
export default authSlice.reducer;
