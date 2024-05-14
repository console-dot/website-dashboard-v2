import { createSlice } from "@reduxjs/toolkit";

export const aiSlice = createSlice({
  name: "ai",
  initialState: {
    aiData: null,
  },
  reducers: {
    setAiData: (state, action) => {
      state.aiData = action.payload; // payload should be ai details object
    },
    resetAidata: (state) => {
      state.aiData = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAiData, resetAidata } = aiSlice.actions;

// Selectors
export const selectAiDetails = (state) => state.ai.aiData;

// The reducer
export default aiSlice.reducer;
