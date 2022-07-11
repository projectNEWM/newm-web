import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "./api";
import { isFailedOAuthCall, isSuccessfulAuthCall } from "./matchers";
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
  errorMessage: "",
};

const sessionSlice = createSlice({
  initialState,
  name: "session",
  reducers: {
    setSessionErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    receiveRefreshToken: handleSuccessfulAuthentication,
    logOut: handleLogout,
  },
  extraReducers: (builder) => {
    builder.addMatcher(isSuccessfulAuthCall, handleSuccessfulAuthentication);

    builder.addMatcher(isFailedOAuthCall, (state, { payload }) => {
      if (payload?.status === 409) {
        state.errorMessage =
          "Please use the social account you originally signed in with";
        return;
      }

      state.errorMessage = "An error occurred while logging in";
    });

    builder.addMatcher(
      api.endpoints.login.matchRejected,
      (state, { payload }) => {
        if (payload?.status === 404 || payload?.status === 401) {
          state.errorMessage = "Incorrect login credentials";
          return;
        }

        state.errorMessage = "An error occurred while logging in";
      }
    );

    builder.addMatcher(
      api.endpoints.getProfile.matchFulfilled,
      (state, { payload }) => {
        state.profile = payload;
      }
    );

    builder.addMatcher(api.endpoints.updateProfile.matchRejected, (state) => {
      state.errorMessage = "An error occurred while updating your profile";
    });
  },
});

export const { logOut, receiveRefreshToken, setSessionErrorMessage } =
  sessionSlice.actions;

export default sessionSlice.reducer;
