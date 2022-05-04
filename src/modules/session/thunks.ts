import { createAsyncThunk } from "@reduxjs/toolkit";
import { extendedApi as sessionApi } from "./api";
import { CreateAccountRequest, UpdateProfileRequest } from "./types";

/**
 * Update the user's profile and navigate to
 * the home page if successful.
 */
export const updateProfile = createAsyncThunk(
  "session/updateProfile",
  async (body: UpdateProfileRequest, thunkApi) => {
    const response = await thunkApi.dispatch(
      sessionApi.endpoints.updateProfile.initiate(body)
    );

    if ("error" in response) {
      return;
    }

    window.location.pathname = "home";
  }
);

/**
 * Fetch inital data. If no profile information is present,
 * navigate to the beginning of the edit profile form.
 */
export const getInitialData = createAsyncThunk(
  "session/getInitialData",
  async (_, thunkApi) => {
    const profileResponse = await thunkApi.dispatch(
      sessionApi.endpoints.getProfile.initiate()
    );

    if (!profileResponse?.data?.nickname) {
      window.location.pathname = "create-profile/what-should-we-call-you";
    }
  }
);

export const createAccount = createAsyncThunk(
  "session/createAccount",
  async (body: CreateAccountRequest, thunkApi) => {
    const createAccountResponse = await thunkApi.dispatch(
      sessionApi.endpoints.createAccount.initiate(body)
    );

    if ("error" in createAccountResponse) {
      return;
    }

    const loginResponse = await thunkApi.dispatch(
      sessionApi.endpoints.login.initiate({
        email: body.email,
        password: body.newPassword,
      })
    );

    if ("error" in loginResponse) {
      return;
    }

    window.location.pathname = "create-profile";
  }
);
