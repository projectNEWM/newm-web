import { PayloadAction } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import { NewmAuthResponse, SessionState } from "./types";

export const handleSuccessfulAuthentication = (
  state: SessionState,
  { payload }: PayloadAction<NewmAuthResponse>
) => {
  Cookie.set("accessToken", payload.accessToken, { expires: 0.05 });
  Cookie.set("refreshToken", payload.refreshToken, { expires: 10 });

  state.isLoggedIn = true;
  state.errorMessage = "";
};
