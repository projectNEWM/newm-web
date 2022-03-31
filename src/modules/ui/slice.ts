import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { isFailedOAuthCall } from "modules/session";

interface UiState {
  errorMessage: string;
}

const initialState: UiState = {
  errorMessage: "",
};

const uiSlice = createSlice({
  initialState,
  name: "ui",
  reducers: {
    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isFailedOAuthCall, (state) => {
      state.errorMessage = "An error occurred while logging in";
    });
  },
});

export const { setErrorMessage } = uiSlice.actions;

export default uiSlice.reducer;
