import { createSlice } from "@reduxjs/toolkit";

export const landingPageSlice = createSlice({
  name: "landingPage",
  initialState: {
    landingPageData: null,
  },
  reducers: {
    setLandingPageData: (state, action) => {
      state.landingPageData = action.payload; // payload should be ai details object
    },
    resetLandingPagedata: (state) => {
      state.landingPageData = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLandingPageData, resetLandingPagedata } = landingPageSlice.actions;

// Selectors
export const selectLandingPageDetails = (state) =>
  state.landingPage.landingPageData;

// The reducer
export default landingPageSlice.reducer;
