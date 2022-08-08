import { AnyAction, PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { setToastMessage } from "modules/ui";
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
  state.errorMessage = "";
};

export const handleLogout = (state: SessionState) => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");

  state.isLoggedIn = false;
  state.errorMessage = "";
};

export const handleSocialLoginError = (
  error: any, // eslint-disable-line
  dispatch: ThunkDispatch<any, any, AnyAction> // eslint-disable-line
) => {
  const errorMessage =
    error?.status === 409
      ? "The email for this account is already in use"
      : "An error occurred while logging in";

  dispatch(
    setToastMessage({
      message: errorMessage,
      severity: "error",
    })
  );
};
