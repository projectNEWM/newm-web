import { configureStore } from "@reduxjs/toolkit";
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
    if (isProduction) {
      return getDefaultMiddleware();
    }

    return getDefaultMiddleware().concat(logger)
  },
  reducer: {
    genre: genreReducer,
    playlist: playlistReducer,
    role: roleReducer,
    song: songReducer,
    ui: uiReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
