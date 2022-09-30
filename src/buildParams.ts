export const isProd = process.env.node_env === "production";
export const isMainNet = process.env.REACT_APP_NETWORK_MODE === "1";

// Change this value to disable Redux logging in development
export const enableReduxLogging = true;

// set this to false to disable countdown page
export const enableCountdown = false;

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
  launchDate: "October 8, 2022 00:00:00",
  songName: "Bigger Dreams",
  subtitle: "x Moodswingz Muzik",
  projectId: Number(process.env.REACT_APP_PROJECT_ID) || 6,
  spotifyLink:
    "https://open.spotify.com/track/1ZSwTbIdB0p7pNLDck5RQb?si=b1c674b4020d4e90&nd=1",
  description:
    "This one's for all the movers and shakers and music tastemakers.\n\n" +
    "MURS has been an innovator in Hip Hop for decades, from being a member of " +
    "the Living Legends crew, to founding the music festival \"Paid Dues\" with " +
    "performers like Wu-Tang Clan, Kendrick Lamar and Mac Miller, to other " +
    "groundbreaking pursuits like setting the Guinness World Record for a " +
    "24-hour livestreamed rap session on Twitch. Before he got his start, he " +
    "crossed paths with a burgeoning young producer named Abyss " +
    "(Moodswingz Muzik) in a Bay Area studio session. Their musical styles " +
    "were so complementary that they discussed doing a project together, but " +
    "life took them separate ways and it never happened - until now...\n\n" +
    "Don't miss being a part of Hip-Hop history! A collab, decades in the " +
    "making, is LIVE now as one of NEWM's first Stream Token Sales.",
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
