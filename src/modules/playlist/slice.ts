import { createSlice } from "@reduxjs/toolkit";
import { Playlist } from "./types";

interface SongState {
  playlists: {
    [id: number]: Playlist;
  };
}

const initialState: SongState = {
  // TEMP: Data is mocked until API data is available
  /* eslint-disable max-len */
  /* eslint-disable sort-keys */
  playlists: {
    1: {
      id: 1,
      title: "Wicked Melowdees",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/0/0a/Kidcudimanonthemoonthelegendof.jpg",
      songCount: 6,
    },
    2: {
      id: 2,
      title: "Wicked Melowdees",
      imageUrl: "https://images.genius.com/6d0fbbc7ce189a8c81671ef92546446e.1000x1000x1.png",
      songCount: 14,
    },
    3: {
      id: 3,
      title: "Wicked Melowdees",
      imageUrl: "https://afterlivesofslavery.files.wordpress.com/2018/04/on-top-of-the-world.jpg",
      songCount: 12,
    },
    4: {
      id: 4,
      title: "Wicked Melowdees",
      imageUrl: "https://m.media-amazon.com/images/I/91OeYnLoCJL._SL1500_.jpg",
      songCount: 4,
    },
    5: {
      id: 5,
      title: "Wicked Melowdees",
      imageUrl: "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi",
      songCount: 7,
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
