import { createSlice } from "@reduxjs/toolkit";
import { Role, RoleState } from "./types";

const initialState: RoleState = {
  // TEMP: Data is mocked until API data is available
  roles: [Role.Producer, Role.Singer, Role.SoundEngineer],
};

const roleSlice = createSlice({
  initialState,
  name: "role",
  reducers: {},
});

export default roleSlice.reducer;
