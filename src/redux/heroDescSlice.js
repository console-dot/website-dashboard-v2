import { createSlice } from "@reduxjs/toolkit";

export const heroDescSlice = createSlice({
  name: "heroDescription",
  initialState: {
    heroDescriptionData: null,
  },
  reducers: {
    setHeroDescriptionData: (state, action) => {
      state.heroDescriptionData = action.payload; 
    },
    resetHeroDescriptionData: (state) => {
      state.heroDescriptionData = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setHeroDescriptionData, resetHeroDescriptionData } = heroDescSlice.actions;

// Selectors
export const selectHeroDescriptionDetails = (state) => state.heroDescription.heroDescriptionData;

// The reducer
export default heroDescSlice.reducer;
