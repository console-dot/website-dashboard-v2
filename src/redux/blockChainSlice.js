import { createSlice } from "@reduxjs/toolkit";

export const blockChainSlice = createSlice({
  name: "blockChain",
  initialState: {
    blockChainData: null,
  },
  reducers: {
    setBlockChainData: (state, action) => {
      state.blockChainData = action.payload; // payload should be ai details object
    },
    resetBlockChaindata: (state) => {
      state.blockChainData = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBlockChainData, resetBlockChaindata } =
  blockChainSlice.actions;

// Selectors
export const selectBlockChainDetails = (state) =>
  state.blockChain.blockChainData;

// The reducer
export default blockChainSlice.reducer;
