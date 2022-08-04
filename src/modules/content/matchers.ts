import { isAnyOf } from "@reduxjs/toolkit";
import { extendedApi } from "./api";

export const isFailedGetContentCall = isAnyOf(
  extendedApi.endpoints.getContent.matchRejected
);

export const isSuccessfulGetContentCall = isAnyOf(
  extendedApi.endpoints.getContent.matchFulfilled
);
