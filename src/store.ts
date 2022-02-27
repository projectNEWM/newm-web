import { configureStore } from "@reduxjs/toolkit";
import { genreReducer } from "modules/genre";
import { roleReducer } from "modules/role";
import { songReducer } from "modules/song";
import logger from "redux-logger";

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    genre: genreReducer,
    role: roleReducer,
    song: songReducer
  }
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
