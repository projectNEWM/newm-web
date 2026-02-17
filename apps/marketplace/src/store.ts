import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { isProd } from "@newm-web/env";
import { isReduxLoggingEnabled } from "./buildParams";
import { newmApi } from "./api";
import { uiReducer } from "./modules/ui";
import { walletReducer } from "./modules/wallet";

export const reducer = combineReducers({
  ui: uiReducer,
  wallet: walletReducer,
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
