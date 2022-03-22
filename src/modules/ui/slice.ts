import { createSlice } from "@reduxjs/toolkit";

interface UiState {}

const initialState: UiState = {};

const uiSlice = createSlice({
  initialState,
  name: "ui",
  reducers: {},
});

export default uiSlice.reducer;
