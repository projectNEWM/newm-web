import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import { extendedApi } from "./api";

interface RoleState {
  isLoggedIn: boolean;
}

const initialState: RoleState = {
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
        Cookie.set("googleAccessToken", payload.token);

        state.isLoggedIn = true;
      }
    );
  },
});

export default sessionSlice.reducer;
