import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { isProd } from "@newm-web/env";
import { audioReducer } from "@newm-web/modules";
import { isReduxLoggingEnabled } from "./buildParams";
import { newmApi } from "./api";
import { uiReducer } from "./modules/ui";

export const reducer = combineReducers({
  audio: audioReducer,
  ui: uiReducer,
  [newmApi.reducerPath]: newmApi.reducer,
});

const store = configureStore({
  devTools: !isProd,
  middleware: (getDefaultMiddleware) => {
    const baseMiddleware = getDefaultMiddleware().prepend(newmApi.middleware);

    return isReduxLoggingEnabled
      ? baseMiddleware.prepend(logger)
      : baseMiddleware;
  },
  reducer,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
