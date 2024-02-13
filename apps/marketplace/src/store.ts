import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { isProd } from "@newm-web/env";
import { isReduxLoggingEnabled } from "./buildParams";

export const reducer = combineReducers({});

const store = configureStore({
  devTools: !isProd,
  middleware: (getDefaultMiddleware) => {
    const baseMiddleware = getDefaultMiddleware();

    return isReduxLoggingEnabled
      ? baseMiddleware.prepend(logger)
      : baseMiddleware;
  },
  reducer,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
