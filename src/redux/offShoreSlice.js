import { createSlice } from "@reduxjs/toolkit";

export const offShoreSlice = createSlice({
  name: "offShore",
  initialState: {
    offShoreData: null,
  },
  reducers: {
    setOffShoreData: (state, action) => {
      state.offShoreData = action.payload; // payload should be offShore details object
    },
    resetOffShoredata: (state) => {
      state.offShoreData = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOffShoreData, resetOffShoredata } = offShoreSlice.actions;

// Selectors
export const selectOffShoreDetails = (state) => state.offShore.offShoreData;

// The reducer
export default offShoreSlice.reducer;
