import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { setToastMessage } from "modules/ui";
import { extendedApi as songApi } from "modules/song";
import { history } from "common/history";
import { setIsLoading } from "./slice";
import { extendedApi as sessionApi } from "./api";
import {
  CreateAccountRequest,
  ResetPasswordRequest,
  UpdateProfileRequest,
} from "./types";

/**
 * Updates the user's profile and fetches the updated data.
 */
export const updateProfile = createAsyncThunk(
  "session/updateInitialProfile",
  async (body: UpdateProfileRequest, { dispatch }) => {
    try {
      dispatch(setIsLoading(true));

      const updateProfileResponse = await dispatch(
        sessionApi.endpoints.updateProfile.initiate(body)
      );

      if ("error" in updateProfileResponse) {
        return;
      }

      await dispatch(sessionApi.endpoints.getProfile.initiate());
    } catch (err) {
      // do nothing, errors handled by endpoints
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

/**
 * Updates the user's profile, fetches the updated data,
 * and navigates to the home page if successful.
 */
export const updateInitialProfile = createAsyncThunk(
  "session/updateInitialProfile",
  async (body: UpdateProfileRequest, { dispatch }) => {
    const updateProfileResponse = await dispatch(updateProfile(body));

    if ("error" in updateProfileResponse) {
      return;
    }

    history.push("/home");
  }
);

/**
 * Fetch inital data. If no profile information is present,
 * navigate to the beginning of the edit profile form.
 */
export const getInitialData = createAsyncThunk(
  "session/getInitialData",
  async (_, { dispatch }) => {
    const songsResponse = await dispatch(songApi.endpoints.getSongs.initiate());

    if ("error" in songsResponse) {
      return;
    }

    const profileResponse = await dispatch(
      sessionApi.endpoints.getProfile.initiate()
    );

    if ("error" in profileResponse) {
      return;
    }

    if (!profileResponse?.data?.nickname) {
      history.push("/create-profile/what-should-we-call-you");
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

    history.push("/create-profile");
  }
);

/**
 * Request a iDenfy authToken and set it as a cookie.
 */
export const getIdenfyAuthToken = createAsyncThunk(
  "session/getIdenfyAuthToken",
  async (_, { dispatch }) => {
    const idenfyTokenResponse = await dispatch(
      sessionApi.endpoints.getIdenfyAuthToken.initiate()
    );

    if ("error" in idenfyTokenResponse) {
      return;
    }

    const { data: { authToken = "", expiryTime = 1200 } = {} } =
      idenfyTokenResponse;

    if (authToken) {
      Cookies.set("idenfyAuthToken", authToken, {
        expires: expiryTime / 86400,
        secure: true,
      });
    }
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

    history.push("/login");

    dispatch(
      setToastMessage({
        heading: "Password changed!",
        message: "Login with the newly defined password.",
        severity: "success",
      })
    );
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
