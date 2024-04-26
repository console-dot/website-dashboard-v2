import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    userDetails: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userDetails = action.payload; // payload should be user details object
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userDetails = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = loginSlice.actions;

// Selectors
export const selectIsLoggedIn = (state) => state.login.isLoggedIn;
export const selectUserDetails = (state) => state.login.userDetails;

// The reducer
export default loginSlice.reducer;
