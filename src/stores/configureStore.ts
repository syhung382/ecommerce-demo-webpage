import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "./slice/globalRequest";
import globalReducer from "./slice/globalSlice";
import userReducer from "./slice/userSlice";
// import logger from "redux-logger";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
  },
  preloadedState,
  // middleware: (gDM) => gDM().concat(logger),
});

store.subscribe(() => {
  saveState({
    global: store.getState().global,
  });
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
