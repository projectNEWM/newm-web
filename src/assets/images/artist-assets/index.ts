interface ArtistImages {
  readonly albumArt: string;
  readonly profileSecondary: string;
  readonly profilePrimary: string;
  readonly profileSm: string;
  readonly profileXs: string;
}

const ArtistImages: Record<string, ArtistImages> = {
  murs: {
    albumArt: require("./murs-assets/album-art.jpg"),
    profilePrimary: require("./murs-assets/profile-cut-tinified.png"),
    profileSecondary: require("./murs-assets/profile-cropped.png"),
    profileSm: require("./murs-assets/profile@60px.png"),
    profileXs: require("./murs-assets/profile-small.png"),
  },
  nido: {
    albumArt: require("./murs-assets/album-art.jpg"),
    profilePrimary: require("./murs-assets/profile-cut-tinified.png"),
    profileSecondary: require("./murs-assets/profile-cropped.png"),
    profileSm: require("./murs-assets/profile@60px.png"),
    profileXs: require("./murs-assets/profile-small.png"),
  },
};

const artistName = process.env.REACT_APP_ARTIST_NAME || "murs";

export default ArtistImages[artistName];
