import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import { isFailedOAuthCall, isSuccessfulOAuthCall } from "./matchers";

interface SessionState {
  isLoggedIn: boolean;
  errorMessage: string;
}

const initialState: SessionState = {
  isLoggedIn: false, // set to true for development and tesing
  errorMessage: "",
};

const sessionSlice = createSlice({
  initialState,
  name: "session",
  reducers: {
    setSessionErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isSuccessfulOAuthCall, (state, { payload }) => {
      Cookie.set("apiToken", payload.token);

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
  },
});

export const { setSessionErrorMessage } = sessionSlice.actions;

export default sessionSlice.reducer;
