import { PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import sessionApi from "./api";
import { DecodedJwt, NewmAuthResponse, SessionState } from "./types";

/**
 * External utils
 * -----------------------------------------------------------------------------
 * Util functions for use outside of the session module.
 */

export const sendVerificationEmail = (email: string) => {
  return sessionApi.endpoints.sendVerificationEmail.initiate({ email });
};

/**
 * Internal utils
 * -----------------------------------------------------------------------------
 * Util functions for use inside of the session module.
 */

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
  state.errorMessage = "";
};

export const handleLogout = (state: SessionState) => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");

  state.isLoggedIn = false;
  state.errorMessage = "";
};
