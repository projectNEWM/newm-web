import { createAsyncThunk } from "@reduxjs/toolkit";
import { setToastMessage } from "modules/ui";
import { extendedApi as songApi } from "modules/song";
import { extendedApi as sessionApi } from "./api";
import {
  CreateAccountRequest,
  ResetPasswordRequest,
  UpdateProfileRequest,
} from "./types";

/**
 * Update the user's profile and navigate to
 * the home page if successful.
 */
export const updateInitialProfile = createAsyncThunk(
  "session/updateInitialProfile",
  async (body: UpdateProfileRequest, { dispatch }) => {
    const response = await dispatch(
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
  async (_, { dispatch }) => {
    dispatch(songApi.endpoints.getSongs.initiate());

    const profileResponse = await dispatch(
      sessionApi.endpoints.getProfile.initiate()
    );

    if (!profileResponse?.data?.nickname) {
      window.location.pathname = "create-profile/what-should-we-call-you";
    }
  }
);

/**
 * Create a user account. Navigate to the create profile flow
 * so the user can enter their profile information.
 */
export const createAccount = createAsyncThunk(
  "session/createAccount",
  async (body: CreateAccountRequest, { dispatch }) => {
    const createAccountResponse = await dispatch(
      sessionApi.endpoints.createAccount.initiate(body)
    );

    if ("error" in createAccountResponse) {
      return;
    }

    const loginResponse = await dispatch(
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

/**
 * Reset user password. Navigate to the login page to have user
 * enter their new password.
 */
export const resetPassword = createAsyncThunk(
  "session/resetPassword",
  async (body: ResetPasswordRequest, { dispatch }) => {
    const resetPasswordResponse = await dispatch(
      sessionApi.endpoints.resetPassword.initiate(body)
    );

    if ("error" in resetPasswordResponse) {
      return;
    }

    dispatch(
      setToastMessage({
        heading: "Password changed!",
        message: "Login with the newly defined password.",
        severity: "success",
      })
    );

    setTimeout(() => {
      window.location.pathname = "login";
    }, 2000);
  }
);

export const handleSocialLoginError = createAsyncThunk(
  "session/handleSocialLoginError",
  // eslint-disable-next-line
  async (error: any, { dispatch }) => {
    const errorMessage =
      error?.status === 409
        ? "The email for this account is already in use"
        : "Email or password is incorrect";

    dispatch(
      setToastMessage({
        heading: "Login",
        message: errorMessage,
        severity: "error",
      })
    );
  }
);
