import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TabName, ViewType } from "./types";

interface UiState {
  home: {
    viewType: ViewType;
  };
}

const initialState: UiState = {
  home: {
    viewType: "grid",
  },
};

const uiSlice = createSlice({
  initialState,
  name: "ui",
  reducers: {
    setHomeViewType: (state, action: PayloadAction<ViewType>) => {
      state.home.viewType = action.payload;
    },
  },
});

export const { setHomeViewType } = uiSlice.actions;

export default uiSlice.reducer;
