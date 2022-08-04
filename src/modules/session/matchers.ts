import { isAnyOf } from "@reduxjs/toolkit";
import { extendedApi } from "./api";

export const isSuccessfulAuthCall = isAnyOf(
  extendedApi.endpoints.login.matchFulfilled,
  extendedApi.endpoints.googleLogin.matchFulfilled,
  extendedApi.endpoints.facebookLogin.matchFulfilled,
  extendedApi.endpoints.linkedInLogin.matchFulfilled
);

export const isFailedOAuthCall = isAnyOf(
  extendedApi.endpoints.googleLogin.matchRejected,
  extendedApi.endpoints.facebookLogin.matchRejected,
  extendedApi.endpoints.linkedInLogin.matchRejected
);

export const isFailedLoginCall = isAnyOf(
  extendedApi.endpoints.login.matchRejected
);

export const isFailedUpdateProfileCall = isAnyOf(
  extendedApi.endpoints.updateProfile.matchRejected
);
