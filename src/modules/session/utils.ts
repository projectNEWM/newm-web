import { PayloadAction } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import { NewmAuthResponse, SessionState } from "./types";

export const handleSuccessfulAuthentication = (
  state: SessionState,
  { payload }: PayloadAction<NewmAuthResponse>
) => {
  Cookie.set("accessToken", payload.accessToken);
  Cookie.set("refreshToken", payload.refreshToken);

  state.isLoggedIn = true;
  state.errorMessage = "";
};
