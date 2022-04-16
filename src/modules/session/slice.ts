import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "./api";
import { isFailedOAuthCall, isSuccessfulAuthCall } from "./matchers";

interface SessionState {
  isLoggedIn: boolean;
  errorMessage: string;
}

const initialState: SessionState = {
  isLoggedIn: !!Cookies.get("accessToken"),
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
      Cookies.remove("accessToken");

      state.isLoggedIn = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isSuccessfulAuthCall, (state, { payload }) => {
      Cookies.set("accessToken", payload.accessToken);

      state.isLoggedIn = true;
      state.errorMessage = "";
    });

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
  },
});

export const { loggedOut, setSessionErrorMessage } = sessionSlice.actions;

export default sessionSlice.reducer;
