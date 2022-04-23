import { createSlice } from "@reduxjs/toolkit";
import api from "./api";
import { SongState } from "./types";

const initialState: SongState = {
  songs: [],
};

const songSlice = createSlice({
  initialState,
  name: "song",
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getSongs.matchFulfilled,
      (state, { payload }) => {
        state.songs = payload;
      }
    );
  },
});

export default songSlice.reducer;
