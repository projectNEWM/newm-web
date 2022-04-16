import { PayloadAction } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import jwtDecode from "jwt-decode";
import { DecodedJwt, NewmAuthResponse, SessionState } from "./types";

export const handleSuccessfulAuthentication = (
  state: SessionState,
  { payload: { accessToken, refreshToken } }: PayloadAction<NewmAuthResponse>
) => {
  const accessTokenExp = jwtDecode<DecodedJwt>(accessToken).exp;
  const refreshTokenExp = jwtDecode<DecodedJwt>(refreshToken).exp;
  const accessTokenExpDate = new Date(accessTokenExp * 1000);
  const refreshTokenExpDate = new Date(refreshTokenExp * 1000);

  Cookie.set("accessToken", accessToken, { expires: accessTokenExpDate });
  Cookie.set("refreshToken", refreshToken, { expires: refreshTokenExpDate });

  state.isLoggedIn = true;
  state.errorMessage = "";
};
