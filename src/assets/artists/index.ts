interface ArtistAssets {
  readonly albumArt: string;
  readonly albumArtXs: string;
  readonly profileSecondary: string;
  readonly profilePrimary: string;
  readonly profileSm: string;
  readonly profileXs: string;
  readonly preview: string;
}

const ArtistAssets: Record<string, ArtistAssets> = {
  murs: {
    albumArt: require("./murs/album-art.jpg"),
    albumArtXs: require("./murs/album-art@80.png"),
    profilePrimary: require("./murs/profile-cut-tinified.png"),
    profileSecondary: require("./murs/profile-cropped.png"),
    profileSm: require("./murs/profile@60px.png"),
    profileXs: require("./murs/profile-small.png"),
    preview: require("./murs/preview.mp3"),
  },
  nido: {
    albumArt: require("./nido/album-art.jpg"),
    albumArtXs: require("./nido/album-art@80.png"),
    profilePrimary: require("./nido/profile-cut-tinified.png"),
    profileSecondary: require("./nido/profile-cropped.jpg"),
    profileSm: require("./nido/profile-small.jpeg"),
    profileXs: require("./nido/profile-small.jpeg"),
    preview: require("./nido/preview.mp3"),
  },
  juse: {
    albumArt: require("./juse/album-art.jpg"),
    albumArtXs: require("./juse/album-art@80.png"),
    profilePrimary: require("./juse/profile-cut-tinified.png"),
    profileSecondary: require("./juse/profile-cropped.png"),
    profileSm: require("./juse/profile-small.png"),
    profileXs: require("./juse/profile-small.png"),
    preview: require("./juse/preview.mp3"),
  },
  abyss: {
    albumArt: require("./abyss/album-art.jpg"),
    albumArtXs: require("./abyss/album-art@80.png"),
    profilePrimary: require("./abyss/profile-cut-tinified.png"),
    profileSecondary: require("./abyss/profile-cropped.png"),
    profileSm: require("./abyss/profile-small.png"),
    profileXs: require("./abyss/profile-small.png"),
    preview: require("./abyss/preview.mp3"),
  },
};

const artistName = process.env.REACT_APP_ARTIST_NAME || "murs";

export default ArtistAssets[artistName];
