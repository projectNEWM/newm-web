import { PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import sessionApi from "./api";
import { DecodedJwt, NewmAuthResponse, SessionState } from "./types";

export const sendVerificationEmail = (email: string) => {
  return sessionApi.endpoints.sendVerificationEmail.initiate({ email });
};

export const handleSuccessfulAuthentication = (
  state: SessionState,
  { payload: { accessToken, refreshToken } }: PayloadAction<NewmAuthResponse>
) => {
  const accessTokenExp = jwtDecode<DecodedJwt>(accessToken).exp;
  const refreshTokenExp = jwtDecode<DecodedJwt>(refreshToken).exp;
  const accessTokenExpDate = new Date(accessTokenExp * 1000);
  const refreshTokenExpDate = new Date(refreshTokenExp * 1000);

  Cookies.set("accessToken", accessToken, { expires: accessTokenExpDate });
  Cookies.set("refreshToken", refreshToken, { expires: refreshTokenExpDate });

  state.isLoggedIn = true;
};

export const handleLogout = (state: SessionState) => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("idenfyAuthToken");

  state.isLoggedIn = false;
};
