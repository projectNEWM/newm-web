/**
 * Redux actions and thunks specific to fetchBaseQueryWithReauth() live here,
 * as importing them from the session module causes a circular dependency.
 */

import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { disconnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import Cookies from "js-cookie";
import { cloudinaryApi, lambdaApi, newmApi } from "./index";
import { NewmAuthResponse } from "../modules/session";

export const logOutExpiredSession = createAsyncThunk(
  "session/logOut",
  async (_, { dispatch }) => {
    disconnectWallet();

    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("idenfyAuthToken");

    dispatch(newmApi.util.resetApiState());
    dispatch(cloudinaryApi.util.resetApiState());
    dispatch(lambdaApi.util.resetApiState());
  }
);

export const receiveRefreshToken = createAction<NewmAuthResponse>(
  "session/receiveRefreshToken"
);
