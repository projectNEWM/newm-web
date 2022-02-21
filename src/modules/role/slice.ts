import { createSlice } from "@reduxjs/toolkit";
import { Role } from "./types";

interface RoleState {
  roles: ReadonlyArray<Role>
}

const initialState: RoleState = {
  // TEMP: Data is mocked until API data is available
  roles: [Role.Producer, Role.Singer, Role.SoundEngineer],
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
});

export default roleSlice.reducer;
