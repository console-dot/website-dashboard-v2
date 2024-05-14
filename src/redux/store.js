import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import loginSlice from "./loginSlice";
import aiSlice from "./aiSlice";

export const store = configureStore({
  reducer: { counter: counterSlice, login: loginSlice, ai: aiSlice },
});
