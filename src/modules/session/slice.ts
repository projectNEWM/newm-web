import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { SessionState } from "./types";
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
    pictureUrl: "",
    role: "",
    genre: "",
    verifiedStatus: "unverified",
  },
  idenfy: {
    authToken: "",
  },
};

const sessionSlice = createSlice({
  initialState,
  name: "session",
  reducers: {
    receiveIdenfyToken(state, { payload }) {
      state.idenfy.authToken = payload;
    },
    receiveProfile(state, { payload }) {
      state.profile = payload;
    },
    receiveRefreshToken: handleSuccessfulAuthentication,
    receiveSuccessfullAuthentication: handleSuccessfulAuthentication,
    logOut: handleLogout,
  },
});

export const {
  logOut,
  receiveIdenfyToken,
  receiveProfile,
  receiveRefreshToken,
  receiveSuccessfullAuthentication,
} = sessionSlice.actions;

export default sessionSlice.reducer;
