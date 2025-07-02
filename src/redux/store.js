import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import loginReducer from "./loginSlice";
import aiReducer from "./aiSlice";
import blockChainReducer from "./blockChainSlice";
import arvrReducer from "./arvrSlice";
import uiuxReducer from "./uiuxSlice";
import openpositionReducer from "./openpositionSlice";
import landingPageReducer from "./landingPageSlice";
import customServiceReducer from "./customServiceSlice";
import offShoreReducer from "./offShoreSlice";
import offshoreserviceReducer from "./offshoreserviceSlice";
import mobdevReducer from "./mobdevSlice";
import webdevReducer from "./webdevSlice";
import productresearchReducer from "./productresearchSlice";
import caseStudiesReducer from "./caseStudiesSlice";
import heroDescriptionReducer from "./heroDescSlice"; // Importing the heroDescSlice reducer
import blogsSlice from "./blogsSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    ai: aiReducer,
    blockChain: blockChainReducer,
    arvr: arvrReducer,
    uiux: uiuxReducer,
    openPosition: openpositionReducer,
    landingPage: landingPageReducer,
    customService: customServiceReducer,
    offShore: offShoreReducer,
    offshoreservice: offshoreserviceReducer,
    mobdev: mobdevReducer, 
    webdev: webdevReducer,
    productresearch: productresearchReducer,
    caseStudies: caseStudiesReducer,
    heroDescription: heroDescriptionReducer, // Adding the heroDescription reducer
    blogs:blogsSlice,
  },
});
