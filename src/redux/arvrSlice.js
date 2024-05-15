import { createSlice } from "@reduxjs/toolkit";

export const arvrSlice = createSlice({
  name: "arvr",
  initialState: {
    arvrData: null,
  },
  reducers: {
    setARData: (state, action) => {
      state.arvrData = action.payload; // payload should be arvr details object
    },
    resetARdata: (state) => {
      state.arvrData = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setARData, resetARdata } = arvrSlice.actions;

// Selectors
export const selectARDetails = (state) => state.arvr.arvrData;

// The reducer
export default arvrSlice.reducer;
