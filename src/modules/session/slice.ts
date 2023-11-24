import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { SessionState } from "./types";
import { handleSuccessfulAuthentication } from "./utils";

const initialState: SessionState = {
  isArtistPricePlanSelected: false,
  // if refresh token is present, user is logged in or can refresh session
  isLoggedIn: !!Cookies.get("refreshToken"),
  verificationPingStartedAt: undefined,
};

const sessionSlice = createSlice({
  initialState,
  name: "session",
  reducers: {
    receiveRefreshToken: handleSuccessfulAuthentication,
    receiveSuccessfullAuthentication: handleSuccessfulAuthentication,
    startVerificationTimer: (state) => {
      state.verificationPingStartedAt = new Date().getTime();
    },
    removeVerificationTimer: (state) => {
      state.verificationPingStartedAt = undefined;
    },
    setIsArtistPricePlanSelected: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isArtistPricePlanSelected = payload;
    },
    setIsLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
  },
});

export const {
  setIsArtistPricePlanSelected,
  setIsLoggedIn,
  receiveRefreshToken,
  receiveSuccessfullAuthentication,
  startVerificationTimer,
  removeVerificationTimer,
} = sessionSlice.actions;

export default sessionSlice.reducer;
