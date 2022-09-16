import { configureStore } from "@reduxjs/toolkit";
import newmApi, { alphaAdvantageApi, cloudinaryApi, phyrhoseApi } from "api";
import { contentReducer } from "modules/content";
import { playlistReducer } from "modules/playlist";
import { sessionReducer } from "modules/session";
import { songReducer } from "modules/song";
import { uiReducer } from "modules/ui";
import { walletReducer } from "modules/wallet";
import { saleReducer } from "modules/sale";
import logger from "redux-logger";
import { enableReduxLogging, isProd } from "buildParams";

export const reducer = {
  content: contentReducer,
  playlist: playlistReducer,
  session: sessionReducer,
  song: songReducer,
  ui: uiReducer,
  wallet: walletReducer,
  sale: saleReducer,
  [newmApi.reducerPath]: newmApi.reducer,
  [cloudinaryApi.reducerPath]: cloudinaryApi.reducer,
  [alphaAdvantageApi.reducerPath]: alphaAdvantageApi.reducer,
  [phyrhoseApi.reducerPath]: phyrhoseApi.reducer,
};

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => {
    const baseMiddleware = [
      ...getDefaultMiddleware(),
      newmApi.middleware,
      alphaAdvantageApi.middleware,
      phyrhoseApi.middleware,
    ];

    if (isProd) {
      return baseMiddleware;
    }

    return enableReduxLogging ? baseMiddleware.concat(logger) : baseMiddleware;
  },
  reducer,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
