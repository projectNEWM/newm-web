import { createSlice } from "@reduxjs/toolkit";
import { SongState } from "./types";

const initialState: SongState = {
  songs: [],
  isLoading: false,
};

const songSlice = createSlice({
  initialState,
  name: "song",
  reducers: {
    receiveSongs(state, { payload }) {
      state.songs = payload;
    },
    setIsLoading(state, { payload }) {
      state.isLoading = payload;
    },
  },
});

export const { receiveSongs, setIsLoading } = songSlice.actions;

export default songSlice.reducer;
