import { createSlice } from "@reduxjs/toolkit";

export const mobdevSlice = createSlice({
  name: "mobdev", 
  initialState: {
    mobdevData: null,
  },
  reducers: {
    setmobdevData: (state, action) => {
      state.mobdevData = action.payload; // payload should be mobdev details object
    },
    resetmobdevdata: (state) => {
      state.mobdevData = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setmobdevData, resetmobdevdata } = mobdevSlice.actions;

// Selectors
export const selectmobdevDetails = (state) => state.mobdev.mobdevData;

// The reducer
export default mobdevSlice.reducer; 
