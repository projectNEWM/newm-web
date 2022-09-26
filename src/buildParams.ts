/* eslint-disable max-len */
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
  songName: "Bigger Dreams",
  subtitle: "x Moodswingz Muzik",
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
      twitter: "https://twitter.com/moodswingzmuzik",
      instagram: "https://www.instagram.com/moodswingzmuzik/",
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
      question: "1. How does it work?",
      answer:
        "When you purchase a bundle (i.e., 8000 Stream Tokens) of a song on NEWM, you're buying the rights to claim a percentage of future streaming royalties next to your favourite artist(s).",
    },
    {
      question: "2. How many bundles can I purchase?",
      answer:
        "Whatever amount your sweet heart desires! However, you can only purchase one bundle per session to give a fair chance to other prospective buyers.",
    },
    {
      question: "3. Where can I listen or stream the song(s)?",
      answer:
        "You can listen to the song(s) on most of the major streaming platforms, including Soundcloud, Youtube Music, Spotify, Tidal, Amazon Music, Apple Music (if it has lyrics), etc. Eventually, NEWM will have a music streaming platform in-app that will offer higher and faster royalty payouts than the traditional platforms.",
    },
    {
      question: "4. How and when can I claim royalties?",
      answer:
        "Royalty payout times can vary widely, depending on the streaming platform. Normally, payouts can take 6 months or more, so please be patient and join our communities where we'll notify you when claiming becomes available.",
    },
    {
      question: "5. How do I get important info about my purchase?",
      answer:
        "Sign up to our 'NEWMusic Owner' email list and join our support channels on Discord and Telegram!",
    },
  ],
};
