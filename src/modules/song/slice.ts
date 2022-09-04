import { createSlice } from "@reduxjs/toolkit";
import { uploadSong } from "./thunks";
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadSong.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadSong.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(uploadSong.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { receiveSongs } = songSlice.actions;

export default songSlice.reducer;
