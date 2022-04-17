import { createSlice } from "@reduxjs/toolkit";

interface GenreState {
  genres: ReadonlyArray<string>;
}

const initialState: GenreState = {
  // TEMP: Data is mocked until API data is available
  genres: ["Rock", "Jazz", "Hip Hop", "Lofi", "Country"],
};

const genreSlice = createSlice({
  initialState,
  name: "genre",
  reducers: {},
});

export default genreSlice.reducer;
