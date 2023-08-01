import { asThunkHook } from "common/reduxUtils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { setToastMessage } from "modules/ui";
import { history } from "common/history";
import { uploadToCloudinary } from "api/cloudinary/utils";
import api, { cloudinaryApi, lambdaApi } from "api";
import { extendedApi as sessionApi } from "./api";
import {
  ChangePasswordRequest,
  CreateAccountRequest,
  DeleteAccountRequest,
  ProfileFormValues,
  ResetPasswordRequest,
} from "./types";
import { setIsLoggedIn } from "./slice";

/**
 * Updates the user's profile and fetches the updated data.
 */
export const updateProfile = createAsyncThunk(
  "session/updateProfile",
  async (body: ProfileFormValues, { dispatch }) => {
    try {
      let bannerUrl;
      let pictureUrl;
      let companyLogoUrl;

      if (body.bannerUrl) {
        // downsize if necessary
        const uploadParams = {
          eager: "c_lfill,w_1600,h_200",
        };

        bannerUrl = await uploadToCloudinary(
          body.bannerUrl as File,
          uploadParams,
          dispatch
        );
      }

      if (body.pictureUrl) {
        // downsize if necessary
        const uploadParams = {
          eager: "c_lfill,w_400,h_400",
        };

        pictureUrl = await uploadToCloudinary(
          body.pictureUrl as File,
          uploadParams,
          dispatch
        );
      }

      if (body.companyLogoUrl) {
        // downsize if necessary
        const uploadParams = {
          eager: "c_lfill,w_200,h_200",
        };

        companyLogoUrl = await uploadToCloudinary(
          body.companyLogoUrl as File,
          uploadParams,
          dispatch
        );
      }

      const updateProfileResponse = await dispatch(
        sessionApi.endpoints.updateProfile.initiate({
          ...body,
          ...{ bannerUrl },
          ...{ pictureUrl },
          ...{ companyLogoUrl },
        })
      );

      if ("error" in updateProfileResponse) {
        dispatch(
          setToastMessage({
            message: "There was an error updating your profile",
            severity: "error",
          })
        );
        return;
      }

      dispatch(
        setToastMessage({
          message: "Successfully updated profile",
          severity: "success",
        })
      );

      await dispatch(sessionApi.endpoints.getProfile.initiate());
    } catch (err) {
      // do nothing, errors handled by endpoints
    }
  }
);

/**
 * Updates the user's profile, fetches the updated data,
 * and navigates to the home page if successful.
 */
export const updateInitialProfile = createAsyncThunk(
  "session/updateInitialProfile",
  async (body: ProfileFormValues, { dispatch }) => {
    const updateProfileResponse = await dispatch(
      sessionApi.endpoints.updateProfile.initiate(body)
    );

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
 * Delete a user account. Navigate to the login page.
 */
export const deleteAccount = createAsyncThunk(
  "session/deleteAccount",
  async (body: DeleteAccountRequest, { dispatch }) => {
    const deleteAccountResponse = await dispatch(
      sessionApi.endpoints.deleteAccount.initiate(body)
    );

    if ("error" in deleteAccountResponse) {
      return;
    }

    dispatch(logOut());

    dispatch(
      setToastMessage({
        heading: "Account deleted!",
        message: "Your account has been deleted.",
        severity: "success",
      })
    );
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

/**
 * Change user password.
 */
export const changePassword = createAsyncThunk(
  "session/changePassword",
  async (body: ChangePasswordRequest, { dispatch }) => {
    const changePasswordResponse = await dispatch(
      sessionApi.endpoints.changePassword.initiate(body)
    );

    if ("error" in changePasswordResponse) {
      return;
    }

    dispatch(
      setToastMessage({
        heading: "Password changed!",
        message: "On next login use the newly defined password.",
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

export const logOut = createAsyncThunk(
  "session/logOut",
  async (_, { dispatch }) => {
    // remove cookies
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("idenfyAuthToken");

    // reset RTKQuery cache
    dispatch(api.util.resetApiState());
    dispatch(cloudinaryApi.util.resetApiState());
    dispatch(lambdaApi.util.resetApiState());

    dispatch(setIsLoggedIn(false));
  }
);

export const useGetInitialData = asThunkHook(getInitialData);

export const useUpdateProfileThunk = asThunkHook(updateProfile);

export const useUpdateInitialProfileThunk = asThunkHook(updateInitialProfile);

export const useChangePasswordThunk = asThunkHook(changePassword);

export const useDeleteAccountThunk = asThunkHook(deleteAccount);
