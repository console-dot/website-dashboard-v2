import { createSlice } from "@reduxjs/toolkit";

export const openpositionSlice = createSlice({
  name: "op",
  initialState: {
    opData: null,
  },
  reducers: {
    setopData: (state, action) => {
      state.opData = action.payload; // payload should be op details object
    },
    resetopdata: (state) => {
      state.opData = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setopData, resetopdata } = openpositionSlice.actions;

// Selectors
export const selectopDetails = (state) => state.op.opData;

// Reducer
export default openpositionSlice.reducer;
