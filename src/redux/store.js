import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import loginSlice from "./loginSlice";
import aiSlice from "./aiSlice";
import blockChainSlice from "./blockChainSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    login: loginSlice,
    ai: aiSlice,
    blockChain: blockChainSlice,
  },
});
