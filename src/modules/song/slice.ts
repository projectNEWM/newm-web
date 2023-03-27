import { createSlice } from "@reduxjs/toolkit";
import { SongState } from "./types";

const initialState: SongState = {
  artistAgreement: "",
  isLoading: false,
};

const songSlice = createSlice({
  initialState,
  name: "song",
  reducers: {
    receiveArtistAgreement(state, { payload }) {
      state.artistAgreement = payload;
    },
    setSongIsLoading(state, { payload }) {
      state.isLoading = payload;
    },
  },
});

export const { receiveArtistAgreement, setSongIsLoading } = songSlice.actions;

export default songSlice.reducer;
