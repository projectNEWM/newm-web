import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { SessionState, VerificationStatus } from "./types";
import { handleLogout, handleSuccessfulAuthentication } from "./utils";

const initialState: SessionState = {
  // if refresh token is present, user is logged in or can refresh session
  isLoggedIn: !!Cookies.get("refreshToken"),
  profile: {
    id: "",
    oauthId: "",
    oauthType: "",
    email: "",
    firstName: "",
    lastName: "",
    nickname: "",
    location: "",
    pictureUrl: "",
    bannerUrl: "",
    role: "",
    genre: "",
    verificationStatus: VerificationStatus.Unverified,
  },
  verificationPingStartedAt: undefined,
  isLoading: false,
};

const sessionSlice = createSlice({
  initialState,
  name: "session",
  reducers: {
    receiveProfile: (state, { payload }) => {
      state.profile = payload;
    },
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
  receiveProfile,
  receiveRefreshToken,
  receiveSuccessfullAuthentication,
  startVerificationTimer,
  removeVerificationTimer,
  setIsLoading,
} = sessionSlice.actions;

export default sessionSlice.reducer;
