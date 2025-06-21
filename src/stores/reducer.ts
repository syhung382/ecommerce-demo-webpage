import { combineReducers } from "@reduxjs/toolkit";
import globalReducer from "./slice/globalSlice";

export const reducer = combineReducers({
  global: globalReducer,
});
