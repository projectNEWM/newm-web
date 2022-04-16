import { isAnyOf } from "@reduxjs/toolkit";
import { extendedApi } from "./api";

export const isSuccessfulAuthCall = isAnyOf(
  extendedApi.endpoints.login.matchFulfilled,
  extendedApi.endpoints.googleLogin.matchFulfilled,
  extendedApi.endpoints.facebookLogin.matchFulfilled,
  extendedApi.endpoints.linkedInLogin.matchFulfilled,
  extendedApi.endpoints.refreshToken.matchFulfilled
);

export const isFailedOAuthCall = isAnyOf(
  extendedApi.endpoints.googleLogin.matchRejected,
  extendedApi.endpoints.facebookLogin.matchRejected,
  extendedApi.endpoints.linkedInLogin.matchRejected
);
