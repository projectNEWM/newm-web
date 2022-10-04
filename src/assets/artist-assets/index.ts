interface ArtistImages {
  readonly albumArt: string;
  readonly albumArtXs: string;
  readonly profileSecondary: string;
  readonly profilePrimary: string;
  readonly profileSm: string;
  readonly profileXs: string;
  readonly preview: string;
}

const ArtistImages: Record<string, ArtistImages> = {
  murs: {
    albumArt: require("./murs-assets/album-art.jpg"),
    albumArtXs: require("./murs-assets/album-art@80.png"),
    profilePrimary: require("./murs-assets/profile-cut-tinified.png"),
    profileSecondary: require("./murs-assets/profile-cropped.png"),
    profileSm: require("./murs-assets/profile@60px.png"),
    profileXs: require("./murs-assets/profile-small.png"),
    preview: require("./murs-assets/preview.mp3"),
  },
  nido: {
    albumArt: require("./nido-assets/album-art.jpg"),
    albumArtXs: require("./nido-assets/album-art@80.png"),
    profilePrimary: require("./nido-assets/profile-cut-tinified.png"),
    profileSecondary: require("./nido-assets/profile-cropped.jpg"),
    profileSm: require("./nido-assets/profile-small.jpeg"),
    profileXs: require("./nido-assets/profile-small.jpeg"),
    preview: require("./nido-assets/preview.mp3"),
  },
};

const artistName = process.env.REACT_APP_ARTIST_NAME || "murs";

export default ArtistImages[artistName];
