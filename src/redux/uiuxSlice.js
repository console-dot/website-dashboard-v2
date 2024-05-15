import { createSlice } from "@reduxjs/toolkit";

export const uiuxSlice = createSlice({
  name: "uiux",
  initialState: {
    uiuxData: null,
  },
  reducers: {
    setUIData: (state, action) => {
      state.uiuxData = action.payload; // payload should be uiux details object
    },
    resetUIdata: (state) => {
      state.uiuxData = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUIData, resetUIdata } = uiuxSlice.actions;

// Selectors
export const selectUIDetails = (state) => state.uiux.uiuxData;

// The reducer
export default uiuxSlice.reducer;
