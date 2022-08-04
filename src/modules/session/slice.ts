import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "./api";
import { isSuccessfulAuthCall } from "./matchers";
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
  },
};

const sessionSlice = createSlice({
  initialState,
  name: "session",
  reducers: {
    receiveRefreshToken: handleSuccessfulAuthentication,
    logOut: handleLogout,
  },
  extraReducers: (builder) => {
    builder.addMatcher(isSuccessfulAuthCall, handleSuccessfulAuthentication);

    builder.addMatcher(
      api.endpoints.getProfile.matchFulfilled,
      (state, { payload }) => {
        state.profile = payload;
      }
    );
  },
});

export const { logOut, receiveRefreshToken } = sessionSlice.actions;

export default sessionSlice.reducer;
