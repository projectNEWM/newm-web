const songData = {
  1: {
    name: "Mr Rager",
    id: 1,
    genre: "Hip Hop",
    user_role: "Singer",
    release_date: new Date(2016, 5).toString(),
    description: "Kid Cudi's best",
    album_image:
      "https://upload.wikimedia.org/wikipedia/en/0/0a/Kidcudimanonthemoonthelegendof.jpg",
    contributors: {
      1: { name: "John", role: "Producer", stake: 0.25 },
      2: { name: "Dan", role: "Sound engineer", stake: 0.25 },
      3: { name: "Cudi", role: "Singer", stake: 0.5 },
    },
    extra_information: "extra info",
  },
  2: {
    name: "Neighbors",
    id: 2,
    genre: "Hip Hop",
    user_role: "Singer",
    release_date: new Date(2017, 5).toString(),
    description: "J.Cole's best",
    album_image:
      "https://images.genius.com/6d0fbbc7ce189a8c81671ef92546446e.1000x1000x1.png",
    contributors: {
      1: { name: "John", role: "Producer", stake: 0.25 },
      2: { name: "Dan", role: "Sound engineer", stake: 0.25 },
      3: { name: "J Cole", role: "Singer", stake: 0.5 },
    },
    extra_information: "extra info",
  },
  3: {
    name: "Alright",
    id: 3,
    genre: "Hip Hop",
    user_role: "Singer",
    release_date: new Date(2018, 5).toString(),
    description: "Kendrick's best",
    album_image:
      "https://afterlivesofslavery.files.wordpress.com/2018/04/on-top-of-the-world.jpg",
    contributors: {
      1: { name: "John", role: "Producer", stake: 0.25 },
      2: { name: "Dan", role: "Sound engineer", stake: 0.25 },
      3: { name: "Kendrick Lamar", role: "Singer", stake: 0.5 },
    },
    extra_information: "extra info",
  },
  4: {
    name: "Flower Boy",
    id: 4,
    genre: "Hip Hop",
    user_role: "Singer",
    release_date: new Date(2018, 5).toString(),
    description: "Kendrick's best",
    album_image: "https://m.media-amazon.com/images/I/91OeYnLoCJL._SL1500_.jpg",
    contributors: {
      1: { name: "John", role: "Producer", stake: 0.25 },
      2: { name: "Dan", role: "Sound engineer", stake: 0.25 },
      3: { name: "Tyler the Creator", role: "Singer", stake: 0.5 },
    },
    extra_information: "extra info",
  },
  5: {
    name: "Sad people",
    id: 5,
    genre: "Hip Hop",
    user_role: "Singer",
    release_date: new Date(2018, 5).toString(),
    description: "Description",
    album_image:
      "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi",
    contributors: {
      1: { name: "John", role: "Producer", stake: 0.25 },
      2: { name: "Dan", role: "Sound engineer", stake: 0.25 },
      3: { name: "Kid Cudi", role: "Singer", stake: 0.5 },
    },
    extra_information: "extra info",
  },
};

export default songData;
