import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import { extendedApi } from "./api";

interface SessionState {
  isLoggedIn: boolean;
}

const initialState: SessionState = {
  isLoggedIn: false,
};

const sessionSlice = createSlice({
  initialState,
  name: "session",
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      extendedApi.endpoints.googleLogin.matchFulfilled,
      (state, { payload }) => {
        Cookie.set("apiToken", payload.token);

        state.isLoggedIn = true;
      }
    );
    builder.addMatcher(
      extendedApi.endpoints.facebookLogin.matchFulfilled,
      (state, { payload }) => {
        Cookie.set("apiToken", payload.token);

        state.isLoggedIn = true;
      }
    );
    builder.addMatcher(
      extendedApi.endpoints.linkedInLogin.matchFulfilled,
      (state, { payload }) => {
        Cookie.set("apiToken", payload.token);

        state.isLoggedIn = true;
      }
    );
  },
});

export default sessionSlice.reducer;
