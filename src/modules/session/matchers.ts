import { isAnyOf } from "@reduxjs/toolkit";
import { extendedApi } from "./api";

export const isSuccessfulOAuthCall = isAnyOf(
  extendedApi.endpoints.googleLogin.matchFulfilled,
  extendedApi.endpoints.facebookLogin.matchFulfilled,
  extendedApi.endpoints.linkedInLogin.matchFulfilled
);

export const isFailedOAuthCall = isAnyOf(
  extendedApi.endpoints.googleLogin.matchRejected,
  extendedApi.endpoints.facebookLogin.matchRejected,
  extendedApi.endpoints.linkedInLogin.matchRejected
);
