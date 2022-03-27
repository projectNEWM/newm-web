import { createSlice } from "@reduxjs/toolkit";
import api from "./api";
import { Song } from "./types";

interface SongState {
  songs: ReadonlyArray<Song>;
}

const initialState: SongState = {
  songs: [],
};

const roleSlice = createSlice({
  initialState,
  name: "role",
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getSongs.matchFulfilled,
      (state, { payload }) => {
        state.songs = payload.songs;
      }
    );
  },
});

export default roleSlice.reducer;
