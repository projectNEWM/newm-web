import { createSlice } from "@reduxjs/toolkit";
import { SongState } from "./types";

const initialState: SongState = {
  songs: [],
  artistAgreement: "",
  isLoading: false,
};

const songSlice = createSlice({
  initialState,
  name: "song",
  reducers: {
    receiveSongs(state, { payload }) {
      state.songs = payload;
    },
    receiveArtistAgreement(state, { payload }) {
      console.log('PAYLOAD: ', payload); // eslint-disable-line
      state.artistAgreement = payload;
    },
    setSongIsLoading(state, { payload }) {
      state.isLoading = payload;
    },
  },
});

export const { receiveSongs, receiveArtistAgreement, setSongIsLoading } =
  songSlice.actions;

export default songSlice.reducer;
