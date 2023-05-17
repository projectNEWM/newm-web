import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Invite, SongState } from "./types";

const initialState: SongState = {
  artistAgreement: "",
  invites: [],
};

const songSlice = createSlice({
  initialState,
  name: "song",
  reducers: {
    receiveArtistAgreement(state, { payload }) {
      state.artistAgreement = payload;
    },
    setInvites(state, action: PayloadAction<Invite[]>) {
      state.invites = action.payload;
    },
    removeInvite: (state, action: PayloadAction<string>) => {
      state.invites = state.invites.filter(
        (collaboration) => collaboration.collaborationId !== action.payload
      );
    },
  },
});

export const { receiveArtistAgreement, setInvites, removeInvite } =
  songSlice.actions;

export default songSlice.reducer;
