import { createSlice } from "@reduxjs/toolkit";
import { ContentState } from "./types";

const initialState: ContentState = {
  // TEMP: Data is mocked until API data is available
  roles: [
    "Arranger",
    "Backup Singer",
    "Composer",
    "Instrumentalist",
    "Lyricist",
    "Main Talent",
    "Manager",
    "Mastering Engineer",
    "Mix Engineer",
    "Orchestrator",
    "Producer",
    "Recording Engineer",
  ],
};

const contentSlice = createSlice({
  initialState,
  name: "content",
  reducers: {
    receiveContent(state, { payload }) {
      state.roles = payload.roles;
    },
  },
});

export const { receiveContent } = contentSlice.actions;

export default contentSlice.reducer;
