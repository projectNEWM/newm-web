import { createSlice } from "@reduxjs/toolkit";
import { GenreState } from "./types";

const initialState: GenreState = {
  // TEMP: Data is mocked until API data is available
  genres: [
    "Alternative",
    "Anime",
    "Blues",
    "Children's",
    "Classical",
    "Clasicalelle",
    "Comedy",
    "Commercial",
    "Country",
    "Dance",
    "Electronic",
    "Enka",
    "Enko",
    "Hip Hop",
    "Indie Pop",
    "Industrial",
    "Inspirational",
    "Instrumental",
    "J-Pop",
    "Jazz",
    "K-Pop",
    "Karaoke",
    "Kayokyoku",
    "Latin",
    "Metal",
    "New Age",
    "Opera",
    "Pop",
    "R&B",
    "RGB",
  ],
};

const genreSlice = createSlice({
  initialState,
  name: "genre",
  reducers: {},
});

export default genreSlice.reducer;
