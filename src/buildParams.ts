export const isProd = process.env.node_env === "production";
export const isMainNet = process.env.REACT_APP_NETWORK_MODE === "1";

// Change this value to disable Redux logging in development
export const enableReduxLogging = true;

// TODO: Update with NEWM server production url host
export const baseUrls: Record<string, string> = {
  newm: isProd
    ? "https://staging-newm-server.herokuapp.com/"
    : "https://staging-newm-server.herokuapp.com/",
  phyrhose: isMainNet
    ? "https://api.phyrhose.io/"
    : "https://testnet.phyrhose.io/",
  alphaAdvantage: "https://www.alphavantage.co/",
  cloudinary: "https://api.cloudinary.com/",
};

// Update values here for the artist being featured
export const projectDetails = {
  artistName: "MURS",
  songName: "Break up",
  subtitle: "Moodswingz Cryptomedia Group",
  projectId: Number(process.env.REACT_APP_PROJECT_ID) || 6,
  spotifyLink:
    "https://open.spotify.com/track/1ZSwTbIdB0p7pNLDck5RQb?si=b1c674b4020d4e90&nd=1",
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis 
    sed nibh sit amet mi euismod pulvinar. Maecenas pulvinar lorem vel erat
    efficitur, interdum ultrices magna ullamcorper. Nam imperdiet nibh
    semper eros iaculis dictum. Donec non sapien sit amet tortor tincidunt
    varius. Etiam hendrerit, felis eleifend maximus ultricies, ligula eros
    maximus enim, non congue quam nisl id turpis. Ut eget fermentum massa.
    Proin fermentum porttitor ipsum sit amet interdum. Vestibulum lacinia
    sagittis malesuada. Fusce eget feugiat sapien. Proin eu sem vitae
    tortor sagittis ornare. Quisque tempus libero id accumsan sodales.
    Vivamus quam mi, molestie a lobortis maximus, bibendum nec nunc.`,
  socials: [
    {
      heading: "MURS",
      twitter: "https://twitter.com/MURS",
      instagram: "https://www.instagram.com/murs316/",
      spotify:
        "https://open.spotify.com/artist/2dWF6m2ksP9GN75fufFp16?si=9NSEpqu7QR-FslN7xFe8sg",
    },
    {
      heading: "Moodswingz",
      twitter: "https://twitter.com/MURS",
      instagram: "https://www.instagram.com/murs316/",
      spotify:
        "https://open.spotify.com/artist/2dWF6m2ksP9GN75fufFp16?si=9NSEpqu7QR-FslN7xFe8sg",
    },
    {
      heading: "NEWM",
      twitter: "https://twitter.com/projectNEWM",
      instagram: "https://www.instagram.com/projectnewm.io/",
      website: "https://newm.io/",
    },
  ],
  faq: [
    {
      question: "What is your motto?",
      answer: "Nothing matters. Nothing exists on purpose.",
    },
    {
      question: "That is a bit dark is it not?",
      answer: "Everything matters everything exists on purpose.",
    },
    {
      question:
        "What is the longest question you have ever asked somebody that takes up to two lines",
      answer: "Answer",
    },
  ],
};
