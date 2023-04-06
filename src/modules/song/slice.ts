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
    setIsLoading(state, { payload }) {
      state.isLoading = payload;
    },
  },
});

export const { receiveArtistAgreement, setIsLoading } = songSlice.actions;

export default songSlice.reducer;
