import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { SessionState } from "./types";
import { handleSuccessfulAuthentication } from "./utils";
import { logOutExpiredSession, receiveRefreshToken } from "../../api/actions";

const initialState: SessionState = {
  // if refresh token is present, user is logged in or can refresh session
  isLoggedIn: !!Cookies.get("refreshToken"),
  verificationPingStartedAt: undefined,
};

const sessionSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(receiveRefreshToken, (state, payload) => {
      handleSuccessfulAuthentication(state, payload);
    });
    builder.addCase(logOutExpiredSession.fulfilled, (state) => {
      state.isLoggedIn = false;
    });
  },
  initialState,
  name: "session",
  reducers: {
    receiveSuccessfullAuthentication: handleSuccessfulAuthentication,
    removeVerificationTimer: (state) => {
      state.verificationPingStartedAt = undefined;
    },
    setIsLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    startVerificationTimer: (state) => {
      state.verificationPingStartedAt = new Date().getTime();
    },
  },
});

export const {
  setIsLoggedIn,
  receiveSuccessfullAuthentication,
  startVerificationTimer,
  removeVerificationTimer,
} = sessionSlice.actions;

export default sessionSlice.reducer;
