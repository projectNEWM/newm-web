import { createAsyncThunk } from "@reduxjs/toolkit";
import { extendedApi as sessionApi } from "./api";
import { UpdateProfileRequest } from "./types";

const { origin } = window.location;

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

    // window.location.href = `${origin}/home`;
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
      window.location.href = `${origin}/create-profile/what-should-we-call-you`;
    }
  }
);
