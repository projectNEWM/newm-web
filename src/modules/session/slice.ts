import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { SessionState } from "./types";
import { handleLogout, handleSuccessfulAuthentication } from "./utils";

const initialState: SessionState = {
  // if refresh token is present, user is logged in or can refresh session
  isLoggedIn: !!Cookies.get("refreshToken"),
  verificationPingStartedAt: undefined,
  isLoading: false,
};

const sessionSlice = createSlice({
  initialState,
  name: "session",
  reducers: {
    receiveRefreshToken: handleSuccessfulAuthentication,
    receiveSuccessfullAuthentication: handleSuccessfulAuthentication,
    logOut: handleLogout,
    startVerificationTimer: (state) => {
      state.verificationPingStartedAt = new Date().getTime();
    },
    removeVerificationTimer: (state) => {
      state.verificationPingStartedAt = undefined;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const {
  logOut,
  receiveRefreshToken,
  receiveSuccessfullAuthentication,
  startVerificationTimer,
  removeVerificationTimer,
  setIsLoading,
} = sessionSlice.actions;

export default sessionSlice.reducer;
