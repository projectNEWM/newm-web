import { createAsyncThunk } from "@reduxjs/toolkit";
import { setToastMessage } from "modules/ui";
import { extendedApi as songApi } from "modules/song";
import { history } from "common/history";
import { extendedApi as sessionApi } from "./api";
import { CreateAccountRequest, UpdateProfileRequest } from "./types";

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

    history.push(`${history.location.pathname}/home`);
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
      history.push(
        `${history.location.pathname}/create-profile/what-should-we-call-you`
      );
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

    history.push(`${history.location.pathname}/create-profile`);
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
