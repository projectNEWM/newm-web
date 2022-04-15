import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import { isFailedOAuthCall, isSuccessfulOAuthCall } from "./matchers";
import { SessionState } from "./types";
import { handleSuccessfulAuthentication } from "./utils";

const initialState: SessionState = {
  isLoggedIn: false,
  errorMessage: "",
};

const sessionSlice = createSlice({
  initialState,
  name: "session",
  reducers: {
    setSessionErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    loggedOut(state) {
      Cookie.remove("accessToken");
      Cookie.remove("refreshToken");

      state.isLoggedIn = false;
      state.errorMessage = "";
    },
    sessionRefreshed: handleSuccessfulAuthentication,
  },
  extraReducers: (builder) => {
    builder.addMatcher(isSuccessfulOAuthCall, handleSuccessfulAuthentication);

    builder.addMatcher(isFailedOAuthCall, (state, { payload }) => {
      if (payload?.status === 409) {
        state.errorMessage =
          "Please use the social account you originally signed in with";
        return;
      }

      state.errorMessage = "An error occurred while logging in";
    });
  },
});

export const { loggedOut, sessionRefreshed, setSessionErrorMessage } =
  sessionSlice.actions;

export default sessionSlice.reducer;
