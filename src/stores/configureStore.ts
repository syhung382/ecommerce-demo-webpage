import { configureStore } from "@reduxjs/toolkit";
// import rootSaga from "./rootSaga";
import logger from "redux-logger";
import { reducer } from "./reducer";

// const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat(logger),
  // middleware: (gDM) => gDM().concat(sagaMiddleware),
});

// sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
