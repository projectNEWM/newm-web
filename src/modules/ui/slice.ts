import { createSlice } from "@reduxjs/toolkit";
import { UIState } from "./types";
import { isFailedGetContentCall } from "../content";
import { isFailedLoginCall, isFailedOAuthCall, isFailedUpdateProfileCall } from "../session";

const initialState: UIState = {
  toast: {
    heading: "",
    message: "",
    severity: "error",
  },
};

const uiSlice = createSlice({
  initialState,
  name: "ui",
  reducers: {
    clearToastMessage: (state) => {
      state.toast.heading = "";
      state.toast.message = "";
      state.toast.severity = "error";
    },
    setToastMessage: (state, { payload }) => {
      state.toast.heading = payload.heading;
      state.toast.message = payload.message;
      state.toast.severity = payload.severity;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isFailedOAuthCall, (state, { payload }) => {
      const errorMessage = payload?.status === 409 
      ? "The email for this account is already in use"
      : "An error occurred while logging in";
      
      state.toast.message = errorMessage;
      state.toast.severity = "error";
    });

    builder.addMatcher(
      isFailedLoginCall,
      (state, { payload }) => {
        const errorMessage = (payload?.status === 404 || payload?.status === 401)
        ? "Incorrect login credentials"
        : "An error occurred while logging in";

        state.toast.message = errorMessage;
        state.toast.severity = "error";
      }
    );

    builder.addMatcher(isFailedUpdateProfileCall, (state) => {
      state.toast.message = "An error occurred while updating your profile";
      state.toast.severity = "error";
    });

    builder.addMatcher(isFailedGetContentCall, (state) => {
      state.toast.message = "An error occured fetching content";
      state.toast.severity = "error";
    });
  },
});

export const { clearToastMessage, setToastMessage } = uiSlice.actions;

export default uiSlice.reducer;
