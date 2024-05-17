import { createSlice } from "@reduxjs/toolkit";

export const webdevSlice = createSlice({
  name: "webdev", 
  initialState: {
    webdevData: null,
  },
  reducers: {
    setwebdevData: (state, action) => {
      state.webdevData = action.payload; // payload should be webdev details object
    },
    resetwebdevdata: (state) => {
      state.webdevData = null;
    },
  },
});

// Action creators are generated for each case reducer function 
export const { setwebdevData, resetwebdevdata } = webdevSlice.actions;

// Selectors
export const selectwebdevDetails = (state) => state.webdev.webdevData;

// The reducer
export default webdevSlice.reducer;
