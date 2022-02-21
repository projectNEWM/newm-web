import { configureStore } from "@reduxjs/toolkit";
import { genreReducer } from "modules/genre";
import { roleReducer } from "modules/role";
import { songReducer } from "modules/song";

const store = configureStore({
  reducer: {
    genre: genreReducer,
    role: roleReducer,
    song: songReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
