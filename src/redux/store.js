import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import loginSlice from "./loginSlice";

export const store = configureStore({
  reducer: { counter: counterSlice, login: loginSlice },
});
