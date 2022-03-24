import { configureStore } from "@reduxjs/toolkit";
import api from "api";
import { genreReducer } from "modules/genre";
import { playlistReducer } from "modules/playlist";
import { roleReducer } from "modules/role";
import { songReducer } from "modules/song";
import { uiReducer } from "modules/ui";
import logger from "redux-logger";

const isProduction = process.env.NODE_ENV === "production";

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => {
    const baseMiddleware = [...getDefaultMiddleware(), api.middleware];

    if (isProduction) {
      return baseMiddleware;
    }

    return baseMiddleware.concat(logger);
  },
  reducer: {
    genre: genreReducer,
    playlist: playlistReducer,
    role: roleReducer,
    song: songReducer,
    ui: uiReducer,
    [api.reducerPath]: api.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
