import { SilentError, asThunkHook } from "@newm-web/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  EnabledWallet,
  disconnectWallet,
  getWalletAddress,
} from "@newm.io/cardano-dapp-wallet-connector";
import { extendedApi as sessionApi } from "./api";
import {
  ChangePasswordRequest,
  CreateAccountRequest,
  DeleteAccountRequest,
  LoginRequest,
  NewmOAuthRequest,
  ProfileFormValues,
  ResetPasswordRequest,
} from "./types";
import { setIsLoggedIn } from "./slice";
import { getIsWalletEnvMismatch } from "./utils";
import { cloudinaryApi, lambdaApi, newmApi } from "../../api";
import { uploadToCloudinary } from "../../api/cloudinary/utils";
import { history } from "../../common/history";
import {
  setIsWalletEnvMismatchModalOpen,
  setToastMessage,
  setUpdateWalletAddressModal,
} from "../../modules/ui";

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

      if ("error" in updateProfileResponse) throw new SilentError();

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

    history.push("/home/profile");
  }
);

/**
 * Logs in and navigates to the library page.
 */
export const login = createAsyncThunk(
  "session/login",
  async (body: LoginRequest, { dispatch }) => {
    const loginResponse = await dispatch(
      sessionApi.endpoints.login.initiate(body)
    );

    if ("error" in loginResponse) return;

    history.push("/home/upload-song");
  }
);
/**
 * Logs in using Apple and navigates to the library page.
 */
export const appleLogin = createAsyncThunk(
  "session/appleLogin",
  async ({ code, redirectUri }: NewmOAuthRequest, { dispatch }) => {
    const loginResponse = dispatch(
      sessionApi.endpoints.appleLogin.initiate({ code, redirectUri })
    );

    if ("error" in loginResponse) return;

    history.push("/home/upload-song");
  }
);

/**
 * Logs in using Google and navigates to the library page.
 */
export const googleLogin = createAsyncThunk(
  "session/googleLogin",
  async (accessToken: string, { dispatch }) => {
    const loginResponse = dispatch(
      sessionApi.endpoints.googleLogin.initiate({ accessToken })
    );

    if ("error" in loginResponse) return;

    history.push("/home/upload-song");
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
    disconnectWallet();

    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("idenfyAuthToken");

    dispatch(newmApi.util.resetApiState());
    dispatch(cloudinaryApi.util.resetApiState());
    dispatch(lambdaApi.util.resetApiState());

    dispatch(setIsLoggedIn(false));
  }
);

/**
 * Handles functionality around saving a wallet address to a user's
 * profile. If an address has not been saved to the profile yet,
 * save it and notify the user. If an address has been added before, but
 * the address from the currently connected wallet is different, prompt
 * the user about overwriting the existing address in their profile.
 */
export const saveWalletAddress = createAsyncThunk(
  "session/saveWalletAddress",
  async (wallet: EnabledWallet, { dispatch }) => {
    let savedWalletAddress;

    try {
      const isEnvMismatch = await getIsWalletEnvMismatch(wallet);
      const newWalletAddress = await getWalletAddress(wallet);

      // notify the user if their connected wallet is for the incorrect env
      if (isEnvMismatch) {
        dispatch(setIsWalletEnvMismatchModalOpen(true));
        return;
      }

      // fetch profile and get currently saved wallet address
      const getProfileResp = await dispatch(
        sessionApi.endpoints.getProfile.initiate()
      );
      if ("error" in getProfileResp || !getProfileResp.data) {
        throw new Error();
      }
      savedWalletAddress = getProfileResp.data.walletAddress;

      // if address hasn't been saved to profile yet, save and notify user
      if (!savedWalletAddress) {
        const updateProfileResp = await dispatch(
          sessionApi.endpoints.updateProfile.initiate({
            walletAddress: newWalletAddress,
          })
        );

        if ("error" in updateProfileResp) {
          throw new Error();
        }

        dispatch(
          setUpdateWalletAddressModal({
            isConfirmationRequired: false,
            message:
              "An address from your currently connected wallet has been " +
              "saved to your profile. This address is where you will " +
              "receive any song tokens and royalties. If you would like " +
              "to use an address from a different wallet, please connect " +
              "that wallet and confirm the prompt to overwrite your " +
              "existing wallet address.",
          })
        );

        return;
      }

      // if address has been saved but current address is different, prompt user
      if (savedWalletAddress !== newWalletAddress) {
        dispatch(
          setUpdateWalletAddressModal({
            isConfirmationRequired: true,
            message:
              "You already have a wallet address saved to your profile. " +
              "Would you like to overwrite it with an address from your " +
              "currently connected wallet?",
          })
        );
      }
    } catch (error) {
      dispatch(
        setUpdateWalletAddressModal({
          isConfirmationRequired: false,
          message:
            "There was an error saving your wallet address to your " +
            "profile, please disconnect and reconnect your wallet.",
        })
      );
    }
  }
);

export const useLoginThunk = asThunkHook(login);
export const useGoogleLoginThunk = asThunkHook(googleLogin);
export const useAppleLoginThunk = asThunkHook(appleLogin);
export const useUpdateProfileThunk = asThunkHook(updateProfile);
export const useUpdateInitialProfileThunk = asThunkHook(updateInitialProfile);
export const useChangePasswordThunk = asThunkHook(changePassword);
export const useDeleteAccountThunk = asThunkHook(deleteAccount);
