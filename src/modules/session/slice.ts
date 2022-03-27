import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
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
  },
});

export default sessionSlice.reducer;
