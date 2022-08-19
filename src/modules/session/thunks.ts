import { createAsyncThunk } from "@reduxjs/toolkit";
import { setToastMessage } from "modules/ui";
import { extendedApi as songApi } from "modules/song";
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
    thunkApi.dispatch(songApi.endpoints.getSongs.initiate());

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

export const handlelLoginError = createAsyncThunk(
  "session/handlelLoginError",
  // eslint-disable-next-line
  async (error: any, thunkApi) => {
    let errorMessage;

    switch (error?.status) {
      case 401:
        errorMessage = "The password is invalid";
        break;
      case 404:
        errorMessage = "No account was found with the email provided";
        break;
      case 409:
        errorMessage = "The email for this account is already in use";
        break;
      default:
        errorMessage = "An error occurred while logging in";
    }

    thunkApi.dispatch(
      setToastMessage({
        heading: "Login",
        message: errorMessage,
        severity: "error",
      })
    );
  }
);
