import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UiState {
  error: string;
}

const initialState: UiState = {
  error: "",
};

const uiSlice = createSlice({
  initialState,
  name: "ui",
  reducers: {
    setErrorMessage(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setErrorMessage } = uiSlice.actions;

export default uiSlice.reducer;
