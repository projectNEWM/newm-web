import { createSlice } from "@reduxjs/toolkit";
import { SongState } from "./types";

const initialState: SongState = {
  artistAgreement: "",
};

const songSlice = createSlice({
  initialState,
  name: "song",
  reducers: {
    receiveArtistAgreement(state, { payload }) {
      state.artistAgreement = payload;
    },
  },
});

export const { receiveArtistAgreement } = songSlice.actions;

export default songSlice.reducer;
