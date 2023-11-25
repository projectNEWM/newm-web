import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import newmApi, { cloudinaryApi, lambdaApi } from "@newm.io/studio/api";
import { playlistReducer } from "@newm.io/studio/modules/playlist";
import { sessionReducer } from "@newm.io/studio/modules/session";
import { songReducer } from "@newm.io/studio/modules/song";
import { enableReduxLogging, isProd } from "@newm.io/studio/buildParams";
import { uiReducer } from "@newm.io/studio/modules/ui";
import { walletReducer } from "@newm.io/studio/modules/wallet";

const sessionPersistConfig = {
  key: "session",
  storage,
  whitelist: ["verificationPingStartedAt"],
};

export const reducer = combineReducers({
  playlist: playlistReducer,
  session: persistReducer(sessionPersistConfig, sessionReducer),
  song: songReducer,
  ui: uiReducer,
  wallet: walletReducer,
  [newmApi.reducerPath]: newmApi.reducer,
  [lambdaApi.reducerPath]: lambdaApi.reducer,
  [cloudinaryApi.reducerPath]: cloudinaryApi.reducer,
});

const store = configureStore({
  devTools: !isProd,
  middleware: (getDefaultMiddleware) => {
    const baseMiddleware = getDefaultMiddleware().prepend(
      newmApi.middleware,
      lambdaApi.middleware,
      cloudinaryApi.middleware
    );

    return enableReduxLogging ? baseMiddleware.prepend(logger) : baseMiddleware;
  },
  reducer,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

export default store;
