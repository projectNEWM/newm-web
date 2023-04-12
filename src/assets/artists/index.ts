interface ArtistAssets {
  readonly albumArt: string;
  readonly albumArtXs: string;
  readonly profilePrimary: string;
  readonly profileSecondary: string;
  readonly profileSm?: string;
  readonly profileXs?: string;
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
    profileSecondary: require("./abyss/profile-cropped.jpg"),
    profileSm: require("./abyss/profile@60.png"),
    profileXs: require("./abyss/profile-small.png"),
    preview: require("./abyss/preview.mp3"),
  },
  danketsu: {
    albumArt: require("./danketsu/album-art.webp"),
    albumArtXs: require("./danketsu/album-art@80.webp"),
    profilePrimary: require("./danketsu/profile-cut.webp"),
    profileSecondary: require("./danketsu/profile-cropped.webp"),
    preview: require("./danketsu/preview.wav"),
  },
  awesomeisjayell: {
    albumArt: require("./awesomeisjayell/album-art.webp"),
    albumArtXs: require("./awesomeisjayell/album-art@80.webp"),
    profilePrimary: require("./awesomeisjayell/profile-cut.webp"),
    profileSecondary: require("./awesomeisjayell/profile-cropped.webp"),
    preview: require("./awesomeisjayell/preview.mp3"),
  },
  oddshapeshadow: {
    albumArt: require("./oddshapeshadow/album-art.webp"),
    albumArtXs: require("./oddshapeshadow/album-art@80.webp"),
    profilePrimary: require("./oddshapeshadow/profile-cut.webp"),
    profileSecondary: require("./oddshapeshadow/profile-cropped.webp"),
    preview: require("./oddshapeshadow/preview.mp3"),
  },
  cusi: {
    albumArt: require("./cusi/album-art.webp"),
    albumArtXs: require("./cusi/album-art@80.webp"),
    profilePrimary: require("./cusi/profile-cut.webp"),
    profileSecondary: require("./cusi/profile-cropped.webp"),
    preview: require("./cusi/preview.mp3"),
  },
  mikelerman: {
    albumArt: require("./mikelerman/album-art.webp"),
    albumArtXs: require("./mikelerman/album-art@80.webp"),
    profilePrimary: require("./mikelerman/profile-cut.webp"),
    profileSecondary: require("./mikelerman/profile-cropped.webp"),
    preview: require("./mikelerman/preview.mp3"),
  },
};

const artistName = process.env.REACT_APP_ARTIST_NAME || "murs";

export default ArtistAssets[artistName];
