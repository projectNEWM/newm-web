interface ProjectDetails {
  readonly artistName: string;
  readonly launchTimestamp: number;
  readonly projectId: number;
  readonly bundleAmount: number;
  readonly bundlePrice: number;
  readonly songName: string;
  readonly subtitle?: string;
  readonly poolLink: string;
  readonly spotifyLink: string;
  readonly description: string;
  readonly socials: ReadonlyArray<{
    readonly heading: string;
    readonly twitter: string;
    readonly instagram?: string;
    readonly spotify?: string;
    readonly website?: string;
  }>;
}

const artistName = process.env.REACT_APP_ARTIST_NAME || "murs";
export const isProd = process.env.NODE_ENV === "production";

// Change this value to disable Redux logging in development
export const enableReduxLogging = !isProd && true;

// set this to false to disable countdown page in development
export const enableCountdown = !isProd && false;

// TODO: Update with NEWM server production url host
export const baseUrls: Record<string, string> = {
  newm: isProd
    ? "https://staging-newm-server.herokuapp.com/"
    : "https://staging-newm-server.herokuapp.com/",
  phyrhose: isProd
    ? "https://api.phyrhose.io/"
    : "https://testnet.phyrhose.io/",
  cloudinary: "https://api.cloudinary.com/",
  alphaAdvantage: "https://www.alphavantage.co/",
  coinGecko: "https://api.coingecko.com/api/",
  binance: "https://api.binance.com/api/",
};

const projectDetailsMap: Record<string, ProjectDetails> = {
  murs: {
    artistName: "MURS",
    songName: "Bigger Dreams",
    subtitle: "x Moodswingz Muzik",
    launchTimestamp: 1665212400000,
    projectId: Number(process.env.REACT_APP_PROJECT_ID) || 6,
    bundleAmount: 8000,
    bundlePrice: 42,
    poolLink: "https://pool.pm/asset19dx98tjqckn26yk5hcse4zm6m0aj4gf7z0z378",
    spotifyLink:
      "https://open.spotify.com/album/2mFn9T6ZIjPxCT5n1ULrvl?si=MdSrbDyrQKyABq5dnHVQ7w&nd=1",
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
        twitter: "https://twitter.com/moodswingzmuzik",
        instagram: "https://www.instagram.com/moodswingzmuzik/",
        website: "http://moodswingzmuzik.com/",
      },
      {
        heading: "NEWM",
        twitter: "https://twitter.com/projectNEWM",
        instagram: "https://www.instagram.com/projectnewm.io/",
        website: "https://newm.io/",
      },
    ],
  },
  nido: {
    artistName: "NIDO",
    launchTimestamp: 1665241200000,
    songName: "Love in the Water",
    projectId: Number(process.env.REACT_APP_PROJECT_ID) || 6,
    bundleAmount: 100000,
    bundlePrice: 22,
    poolLink: "https://pool.pm/asset1dqngvnugq799j6cxxyqkf97r4q6rz8x46nknts",
    spotifyLink:
      "https://open.spotify.com/track/38xqzTW8mMLP876PBU3F9F?si=VKwvFLHFTIejygODGHhoIQ&utm_source=native-share-menu",
    description:
      "Hi! I'm NIDO, a producer from Norway. I got my start about 17 years " +
      "ago in the Metal/Rock scene, but more recently transitioned to " +
      "Synthwave/EDM-style music. Electronic music has given me a deeper " +
      "connection with my fans, which is my top priority as an artist.\n\n" +
      "\"Love in the Water\" is dedicated to all of you. It's about two " +
      "strangers forming a deeper bond and deciding to test the waters of " +
      "their connection. A nod to how love and music connect us all as human " +
      "beings, and it's important to try new things and support one another " +
      "because it could lead to something great.\n\n" +
      "That's why I'm sharing this song with my fans in this Stream Token " +
      "drop. We may be strangers, but now, you can be a part of my music and " +
      "even receive royalties. Together, we can decide how far we push this " +
      "song - chart toppers, here we come!",
    socials: [
      {
        heading: "NIDO",
        twitter: "https://twitter.com/OfficialNID0",
        spotify:
          "https://open.spotify.com/artist/7vIuaRUTygrIF7PbcalDpK?si=g7_ruNbRR52zJzgz3eN2_g",
        website: "https://www.officialnido.com",
      },
    ],
  },
};

export const projectDetails = projectDetailsMap[artistName];
