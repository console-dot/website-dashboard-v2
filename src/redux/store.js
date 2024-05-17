import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import loginSlice from "./loginSlice";
import aiSlice from "./aiSlice";
import blockChainSlice from "./blockChainSlice";
import arvrSlice from "./arvrSlice";
import uiuxSlice from "./uiuxSlice";
import openpositionSlice from "./openpositionSlice";
import landingPageSlice from "./landingPageSlice";
import customServiceSlice from "./customServiceSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    login: loginSlice,
    ai: aiSlice,
    blockChain: blockChainSlice,
    arvr: arvrSlice,
    uiux: uiuxSlice,
    openPosition: openpositionSlice,
    landingPage: landingPageSlice,
    customService: customServiceSlice,
  },
});
