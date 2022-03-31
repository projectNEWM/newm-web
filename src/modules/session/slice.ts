import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import { isSuccessfulOAuthCall } from "./matchers";

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
    builder.addMatcher(isSuccessfulOAuthCall, (state, { payload }) => {
      Cookie.set("apiToken", payload.token);

      state.isLoggedIn = true;
    });
  },
});

export default sessionSlice.reducer;
