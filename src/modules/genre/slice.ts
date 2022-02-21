import { createSlice } from '@reduxjs/toolkit'

interface GenreState {
  genres: ReadonlyArray<string>
}

const initialState: GenreState = {
  // TEMP: Data is mocked until API data is available
  genres: ["Rock", "Jazz", "Hip Hop", "Lofi", "Country"],
};

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    // example action (clears genres)
    clear: (state) => {
      state.genres = []
    }
  },
});

export const { clear } = genreSlice.actions;

export default genreSlice.reducer;
