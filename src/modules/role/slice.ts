import { createSlice } from "@reduxjs/toolkit";
import { RoleState } from "./types";

const initialState: RoleState = {
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

const roleSlice = createSlice({
  initialState,
  name: "role",
  reducers: {},
});

export default roleSlice.reducer;
