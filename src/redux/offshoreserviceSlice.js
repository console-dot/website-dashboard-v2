import { createSlice } from "@reduxjs/toolkit";

export const offshoreserviceSlice = createSlice({
  name: "offshoreservice",
  initialState: {
    offshoreserviceData: null,
  },
  reducers: {
    setoffshoreserviceData: (state, action) => {
      state.offshoreserviceData = action.payload; // payload should be offshoreservice details object
    },
    resetoffshoreservicedata: (state) => {
      state.offshoreserviceData = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setoffshoreserviceData, resetoffshoreservicedata } = offshoreserviceSlice.actions;

// Selectors
export const selectoffshoreserviceDetails = (state) => state.offshoreservice.offshoreserviceData;

// The reducer
export default offshoreserviceSlice.reducer;
