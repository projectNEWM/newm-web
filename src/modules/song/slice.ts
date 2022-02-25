import { createSlice } from "@reduxjs/toolkit";
import { Role } from "modules/role";
import { Song } from "./types";

interface SongState {
  songs: {
    [id: number]: Song;
  };
}

const initialState: SongState = {
  // TEMP: Data is mocked until API data is available
  /* eslint-disable max-len */
  /* eslint-disable sort-keys */
  songs: {
    1: {
      name: "Mr Rager",
      id: 1,
      genre: "Hip Hop",
      userRole: Role.Singer,
      releaseDate: new Date(2016, 5).toString(),
      description: "Kid Cudi's best",
      albumImage: "https://upload.wikimedia.org/wikipedia/en/0/0a/Kidcudimanonthemoonthelegendof.jpg",
      contributors: {
        1: { name: "John", role: Role.Producer, stake: 0.25 },
        2: { name: "Dan", role: Role.SoundEngineer, stake: 0.25 },
        3: { name: "Cudi", role: Role.Singer, stake: 0.5 },
      },
      extraInformation: "extra info",
    },
    2: {
      name: "Neighbors",
      id: 2,
      genre: "Hip Hop",
      userRole: Role.Singer,
      releaseDate: new Date(2017, 5).toString(),
      description: "J.Cole's best",
      albumImage: "https://images.genius.com/6d0fbbc7ce189a8c81671ef92546446e.1000x1000x1.png",
      contributors: {
        1: { name: "John", role: Role.Producer, stake: 0.25 },
        2: { name: "Dan", role: Role.SoundEngineer, stake: 0.25 },
        3: { name: "J Cole", role: Role.Singer, stake: 0.5 },
      },
      extraInformation: "extra info",
    },
    3: {
      name: "Alright",
      id: 3,
      genre: "Hip Hop",
      userRole: Role.Singer,
      releaseDate: new Date(2018, 5).toString(),
      description: "Kendrick's best",
      albumImage: "https://afterlivesofslavery.files.wordpress.com/2018/04/on-top-of-the-world.jpg",
      contributors: {
        1: { name: "John", role: Role.Producer, stake: 0.25 },
        2: { name: "Dan", role: Role.SoundEngineer, stake: 0.25 },
        3: { name: "Kendrick Lamar", role: Role.Singer, stake: 0.5 },
      },
      extraInformation: "extra info",
    },
    4: {
      name: "Flower Boy",
      id: 4,
      genre: "Hip Hop",
      userRole: Role.Singer,
      releaseDate: new Date(2018, 5).toString(),
      description: "Kendrick's best",
      albumImage: "https://m.media-amazon.com/images/I/91OeYnLoCJL._SL1500_.jpg",
      contributors: {
        1: { name: "John", role: Role.Producer, stake: 0.25 },
        2: { name: "Dan", role: Role.SoundEngineer, stake: 0.25 },
        3: { name: "Tyler the Creator", role: Role.Singer, stake: 0.5 },
      },
      extraInformation: "extra info",
    },
    5: {
      name: "Sad people",
      id: 5,
      genre: "Hip Hop",
      userRole: Role.Singer,
      releaseDate: new Date(2018, 5).toString(),
      description: "Description",
      albumImage:
        "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi",
      contributors: {
        1: { name: "John", role: Role.Producer, stake: 0.25 },
        2: { name: "Dan", role: Role.SoundEngineer, stake: 0.25 },
        3: { name: "Kid Cudi", role: Role.Singer, stake: 0.5 },
      },
      extraInformation: "extra info",
    },
    6: {
      name: "Sad people",
      id: 5,
      genre: "Hip Hop",
      userRole: Role.Singer,
      releaseDate: new Date(2018, 5).toString(),
      description: "Description",
      albumImage:
        "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi",
      contributors: {
        1: { name: "John", role: Role.Producer, stake: 0.25 },
        2: { name: "Dan", role: Role.SoundEngineer, stake: 0.25 },
        3: { name: "Kid Cudi", role: Role.Singer, stake: 0.5 },
      },
      extraInformation: "extra info",
    },
    7: {
      name: "Sad people",
      id: 5,
      genre: "Hip Hop",
      userRole: Role.Singer,
      releaseDate: new Date(2018, 5).toString(),
      description: "Description",
      albumImage:
        "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi",
      contributors: {
        1: { name: "John", role: Role.Producer, stake: 0.25 },
        2: { name: "Dan", role: Role.SoundEngineer, stake: 0.25 },
        3: { name: "Kid Cudi", role: Role.Singer, stake: 0.5 },
      },
      extraInformation: "extra info",
    },
    8: {
      name: "Sad people",
      id: 5,
      genre: "Hip Hop",
      userRole: Role.Singer,
      releaseDate: new Date(2018, 5).toString(),
      description: "Description",
      albumImage:
        "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi",
      contributors: {
        1: { name: "John", role: Role.Producer, stake: 0.25 },
        2: { name: "Dan", role: Role.SoundEngineer, stake: 0.25 },
        3: { name: "Kid Cudi", role: Role.Singer, stake: 0.5 },
      },
      extraInformation: "extra info",
    },
    9: {
      name: "Sad people",
      id: 5,
      genre: "Hip Hop",
      userRole: Role.Singer,
      releaseDate: new Date(2018, 5).toString(),
      description: "Description",
      albumImage:
        "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi",
      contributors: {
        1: { name: "John", role: Role.Producer, stake: 0.25 },
        2: { name: "Dan", role: Role.SoundEngineer, stake: 0.25 },
        3: { name: "Kid Cudi", role: Role.Singer, stake: 0.5 },
      },
      extraInformation: "extra info",
    },
    10: {
      name: "Sad people",
      id: 5,
      genre: "Hip Hop",
      userRole: Role.Singer,
      releaseDate: new Date(2018, 5).toString(),
      description: "Description",
      albumImage:
        "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi",
      contributors: {
        1: { name: "John", role: Role.Producer, stake: 0.25 },
        2: { name: "Dan", role: Role.SoundEngineer, stake: 0.25 },
        3: { name: "Kid Cudi", role: Role.Singer, stake: 0.5 },
      },
      extraInformation: "extra info",
    },
    11: {
      name: "Sad people",
      id: 5,
      genre: "Hip Hop",
      userRole: Role.Singer,
      releaseDate: new Date(2018, 5).toString(),
      description: "Description",
      albumImage:
        "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi",
      contributors: {
        1: { name: "John", role: Role.Producer, stake: 0.25 },
        2: { name: "Dan", role: Role.SoundEngineer, stake: 0.25 },
        3: { name: "Kid Cudi", role: Role.Singer, stake: 0.5 },
      },
      extraInformation: "extra info",
    },
    12: {
      name: "Sad people",
      id: 5,
      genre: "Hip Hop",
      userRole: Role.Singer,
      releaseDate: new Date(2018, 5).toString(),
      description: "Description",
      albumImage:
        "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi",
      contributors: {
        1: { name: "John", role: Role.Producer, stake: 0.25 },
        2: { name: "Dan", role: Role.SoundEngineer, stake: 0.25 },
        3: { name: "Kid Cudi", role: Role.Singer, stake: 0.5 },
      },
      extraInformation: "extra info",
    },
    13: {
      name: "Sad people",
      id: 5,
      genre: "Hip Hop",
      userRole: Role.Singer,
      releaseDate: new Date(2018, 5).toString(),
      description: "Description",
      albumImage:
        "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi",
      contributors: {
        1: { name: "John", role: Role.Producer, stake: 0.25 },
        2: { name: "Dan", role: Role.SoundEngineer, stake: 0.25 },
        3: { name: "Kid Cudi", role: Role.Singer, stake: 0.5 },
      },
      extraInformation: "extra info",
    },
    14: {
      name: "Sad people",
      id: 5,
      genre: "Hip Hop",
      userRole: Role.Singer,
      releaseDate: new Date(2018, 5).toString(),
      description: "Description",
      albumImage:
        "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi",
      contributors: {
        1: { name: "John", role: Role.Producer, stake: 0.25 },
        2: { name: "Dan", role: Role.SoundEngineer, stake: 0.25 },
        3: { name: "Kid Cudi", role: Role.Singer, stake: 0.5 },
      },
      extraInformation: "extra info",
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
