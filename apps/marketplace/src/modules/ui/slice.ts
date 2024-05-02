import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UIState } from "./types";

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
    setToastMessage: (state, { payload }: PayloadAction<UIState["toast"]>) => {
      state.toast = payload;
    },
  },
});

export const { clearToastMessage, setToastMessage } = uiSlice.actions;

export default uiSlice.reducer;
