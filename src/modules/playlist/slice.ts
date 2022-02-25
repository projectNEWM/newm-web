import { createSlice } from "@reduxjs/toolkit";
import { Playlist } from "./types";

interface SongState {
  playlists: {
    [id: string]: Playlist;
  };
}

const initialState: SongState = {
  // TEMP: Data is mocked until API data is available
  /* eslint-disable max-len */
  /* eslint-disable sort-keys */
  playlists: {
    "39F63442-DC66-4AED-8280-6FB618082DFE": {
      id: "39F63442-DC66-4AED-8280-6FB618082DFE",
      name: "Wicked Melowdees",
      coverImageUrl: "https://afterlivesofslavery.files.wordpress.com/2018/04/on-top-of-the-world.jpg",
      songIds: [
        "39F63442-DC66-4AED-8280-6FB618082DFE",
        "AF453F0F-93B2-4230-89E2-5FABFC4BE73B",
        "D0222091-7707-4C6E-BB62-AA73684EB80F",
      ],
    },
    "39F63442-DC66-4AED-8280-6FB618082DFF": {
      id: "39F63442-DC66-4AED-8280-6FB618082DFF",
      name: "Wicked Melowdees",
      coverImageUrl: "https://upload.wikimedia.org/wikipedia/en/0/0a/Kidcudimanonthemoonthelegendof.jpg",
      songIds: [
        "39F63442-DC66-4AED-8280-6FB618082DFE",
        "AF453F0F-93B2-4230-89E2-5FABFC4BE73B",
        "D0222091-7707-4C6E-BB62-AA73684EB80F",
      ],
    },
    "39F63442-DC66-4AED-8280-6FB618082DFG": {
      id: "39F63442-DC66-4AED-8280-6FB618082DFG",
      name: "Wicked Melowdees",
      coverImageUrl: "https://images.genius.com/6d0fbbc7ce189a8c81671ef92546446e.1000x1000x1.png",
      songIds: [
        "39F63442-DC66-4AED-8280-6FB618082DFE",
        "AF453F0F-93B2-4230-89E2-5FABFC4BE73B",
        "D0222091-7707-4C6E-BB62-AA73684EB80F",
      ],
    },
    "39F63442-DC66-4AED-8280-6FB618082DFH": {
      id: "39F63442-DC66-4AED-8280-6FB618082DFH",
      name: "Wicked Melowdees",
      coverImageUrl: "https://afterlivesofslavery.files.wordpress.com/2018/04/on-top-of-the-world.jpg",
      songIds: [
        "39F63442-DC66-4AED-8280-6FB618082DFE",
        "AF453F0F-93B2-4230-89E2-5FABFC4BE73B",
        "D0222091-7707-4C6E-BB62-AA73684EB80F",
      ],
    },
    "39F63442-DC66-4AED-8280-6FB618082DFI": {
      id: "39F63442-DC66-4AED-8280-6FB618082DFI",
      name: "Wicked Melowdees",
      coverImageUrl: "https://m.media-amazon.com/images/I/91OeYnLoCJL._SL1500_.jpg",
      songIds: [
        "39F63442-DC66-4AED-8280-6FB618082DFE",
        "AF453F0F-93B2-4230-89E2-5FABFC4BE73B",
        "D0222091-7707-4C6E-BB62-AA73684EB80F",
      ],
    },
    "39F63442-DC66-4AED-8280-6FB618082DFJ": {
      id: "39F63442-DC66-4AED-8280-6FB618082DFJ",
      name: "Wicked Melowdees",
      coverImageUrl: "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi",
      songIds: [
        "39F63442-DC66-4AED-8280-6FB618082DFE",
        "AF453F0F-93B2-4230-89E2-5FABFC4BE73B",
        "D0222091-7707-4C6E-BB62-AA73684EB80F",
      ],
    },
  },
  /* eslint-enable max-len */
  /* eslint-enable sort-keys */
};

const roleSlice = createSlice({
  initialState,
  name: "role",
  reducers: {},
});

export default roleSlice.reducer;
