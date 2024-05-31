import { createSlice } from "@reduxjs/toolkit";

export const caseStudiesSlice = createSlice({
  name: "caseStudies",
  initialState: {
    caseStudiesData: null,
  },
  reducers: {
    setCaseStudiesData: (state, action) => {
      state.caseStudiesData = action.payload; // payload should be caseStudies details object
    },
    resetCaseStudiesdata: (state) => {
      state.caseStudiesData = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCaseStudiesData, resetCaseStudiesdata } =
  caseStudiesSlice.actions;

// Selectors
export const selectCaseStudiesDetails = (state) =>
  state.caseStudies.caseStudiesData;

// The reducer
export default caseStudiesSlice.reducer;
