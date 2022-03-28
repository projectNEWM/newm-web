import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
});

export const { setErrorMessage } = uiSlice.actions;

export default uiSlice.reducer;
