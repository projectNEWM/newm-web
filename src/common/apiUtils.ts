import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import Cookies from "js-cookie";
import { RootState } from "store";

export const prepareNewmAuthHeader = (
  headers: Headers,
  {
    getState,
  }: Pick<BaseQueryApi, "type" | "getState" | "extra" | "endpoint" | "forced">
) => {
  const state = getState() as RootState;
  const { isLoggedIn } = state.session;
  const accessToken = Cookies.get("accessToken");
  const hasAuthHeader = !!headers.get("Authorization");

  if (isLoggedIn && accessToken && !hasAuthHeader) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return headers;
};

/**
 * Takes multiple RTK Query API objects and returns
 * a single merged API object.
 */
export const mergeApis = (
  // eslint-disable-next-line
  ...apis: any[]
) => {
  return apis.reduce(
    (merged, api) => ({
      ...api,
      ...merged,
      endpoints: {
        ...merged.endpoints,
        ...api.endpints,
      },
    }),
    {}
  );
};
