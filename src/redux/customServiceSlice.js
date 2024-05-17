import { createSlice } from "@reduxjs/toolkit";

export const customServiceSlice = createSlice({
  name: "customService",
  initialState: {
    customServiceData: null,
  },
  reducers: {
    setCustomServiceData: (state, action) => {
      state.customServiceData = action.payload; // payload should be customService details object
    },
    resetCustomServicedata: (state) => {
      state.customServiceData = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCustomServiceData, resetCustomServicedata } =
  customServiceSlice.actions;

// Selectors
export const selectCustomServiceDetails = (state) =>
  state.customService.customServiceData;

// The reducer
export default customServiceSlice.reducer;
