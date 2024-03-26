export const mockArtist = {
  coverImageUrl:
    "https://res.cloudinary.com/newm/image/upload/v1680991027/cvjbuze1tqft5srafmzg.jpg",
  description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
    velit esse cillum dolore eu fugiat nulla pariatur.`,
  firstName: "Johnny",
  id: "abcd1234",
  instagramUrl: "",
  isVerified: true,
  itunesUrl: "",
  lastName: "Appleseed",
  location: "Barcelona, Spain",
  profileImageUrl:
    "https://res.cloudinary.com/newm/image/upload/v1701715430/pzeo4bcivjouksomeggy.jpg",
  songCount: 4,
  soundCloudUrl: "https://www.example.com",
  spotifyUrl: "https://www.example.com",
  websiteUrl: "https://www.example.com",
  xUrl: "https://www.example.com",
};

export const mockArtists = (() => {
  const list = [];

  for (let i = 0; i < 8; i++) {
    list.push({
      ...mockArtist,
      profileImageUrl:
        i % 2 == 0
          ? "https://res.cloudinary.com/newm/image/upload/v1701715430/pzeo4bcivjouksomeggy.jpg"
          : "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1695587661/mprskynp42oijtpaypeq.jpg",
    });
  }

  return list;
})();

export const mockSongs = [
  {
    coverArtUrl:
      "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1706033133/efpgmcjwk8glctlwfzm8.png",
    genres: ["Punk"],
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df58",
    price: "3.0",
    streamUrl:
      "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
    title: "Vibrate Punk",
  },
  {
    coverArtUrl:
      "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1706033133/efpgmcjwk8glctlwfzm8.png",
    genres: ["Punk"],
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df581",
    price: "3.0",
    streamUrl:
      "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
    title: "Vibrate Punk",
  },
  {
    coverArtUrl:
      "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1706033133/efpgmcjwk8glctlwfzm8.png",
    genres: ["Punk"],
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df582",
    price: "3.0",
    streamUrl:
      "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
    title: "Vibrate Punk",
  },
  {
    coverArtUrl:
      "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1699544008/xrcmyar9m09mk3l9mo1o.png",
    genres: ["Punk"],
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df583",
    price: "3.0",
    streamUrl:
      "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
    title: "Vibrate Punk",
  },
  {
    coverArtUrl:
      "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1699580048/aw7w0kielduse0z4vavi.png",
    genres: ["Punk"],
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df584",
    price: "3.0",
    streamUrl:
      "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
    title: "Vibrate Punk",
  },
  {
    coverArtUrl:
      "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1701892098/rka1mlzzad6ohrcfqef3.png",
    genres: ["Punk"],
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df585",
    price: "3.0",
    streamUrl:
      "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
    title: "Vibrate Punk",
  },
  {
    coverArtUrl:
      "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1702264297/ql6f3j5tettsbc3moea3.png",
    genres: ["Punk"],
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df586",
    price: "3.0",
    streamUrl:
      "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
    title: "Vibrate Punk",
  },
  {
    coverArtUrl:
      "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1702264297/ql6f3j5tettsbc3moea3.png",
    genres: ["Punk"],
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df587",
    price: "3.0",
    streamUrl:
      "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
    title: "Vibrate Punk",
  },
];
