import { createSlice } from "@reduxjs/toolkit";

export const productresearchSlice = createSlice({
  name: "productresearch",
  initialState: {
    productresearchData: null,
  },
  reducers: {
    setproductresearchData: (state, action) => {
      state.productresearchData = action.payload; // payload should be productresearch details object
    },
    resetproductresearchdata: (state) => {
      state.productresearchData = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setproductresearchData, resetproductresearchdata } = productresearchSlice.actions;

// Selectors
export const selectproductresearchDetails = (state) => state.productresearch.productresearchData;

// The reducer 
export default productresearchSlice.reducer;
