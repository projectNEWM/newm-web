import { createSlice } from "@reduxjs/toolkit";
import { SongState } from "./types";

const initialState: SongState = {
  songs: [],
};

const songSlice = createSlice({
  initialState,
  name: "song",
  reducers: {
    receiveSongs(state, { payload }) {
      state.songs = payload;
    },
  },
});

export const { receiveSongs } = songSlice.actions;

export default songSlice.reducer;
