import { configureStore } from "@reduxjs/toolkit";
import api from "api";
import { contentReducer } from "modules/content";
import { playlistReducer } from "modules/playlist";
import { sessionReducer } from "modules/session";
import { songReducer } from "modules/song";
import logger from "redux-logger";

const isProduction = process.env.NODE_ENV === "production";

export const reducer = {
  content: contentReducer,
  playlist: playlistReducer,
  session: sessionReducer,
  song: songReducer,
  [api.reducerPath]: api.reducer,
};

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => {
    const baseMiddleware = [...getDefaultMiddleware()];

    if (isProduction) {
      return baseMiddleware;
    }

    return baseMiddleware.concat(logger);
  },
  reducer,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
