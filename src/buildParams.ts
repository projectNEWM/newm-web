interface ProjectDetails {
  readonly artistName: string;
  readonly launchTimestamp: number;
  readonly projectId: number;
  readonly bundleAmount: number;
  readonly totalTokens: number;
  readonly bundlePrice: number;
  readonly royaltyAgreement: string;
  readonly songName: string;
  readonly subtitle?: string;
  readonly poolLink: string;
  readonly spotifyLink: string;
  readonly description: string;
  readonly socials: ReadonlyArray<{
    readonly heading: string;
    readonly discord?: string;
    readonly twitter?: string;
    readonly instagram?: string;
    readonly spotify?: string;
    readonly soundcloud?: string;
    readonly facebook?: string;
    readonly tikTok?: string;
    readonly youTube?: string;
    readonly website?: string;
  }>;
}

const artistName = process.env.REACT_APP_ARTIST_NAME || "murs";
export const isProd = process.env.NODE_ENV === "production";

// Change this value to disable Redux logging in development
export const enableReduxLogging = !isProd && true;

// set this to false to disable countdown page in development
export const enableCountdown = isProd || false;

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
    totalTokens: 100000000,
    bundlePrice: 42,
    royaltyAgreement:
      "https://jvwilqyxryrrjc6ctsofeffbtyf7zbuytkka5ayrapcbzfo3b2na.arweave.net/" +
      "TWyFwxeOIxSLwpycUhShngv8hpialA6DEQPEHJXbDpo",
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
    totalTokens: 100000000,
    bundlePrice: 22,
    royaltyAgreement:
      "https://v7oqxvh6s6biul2cjn7rcx4vz6ujevzsmzi7f2ylucnxqlfrdb7q.arweave.net" +
      "/r90L1P6XgoovQkt_EV-Vz6iSVzJmUfLrC6CbeCyxGH8",
    poolLink: "https://pool.pm/asset1dqngvnugq799j6cxxyqkf97r4q6rz8x46nknts",
    spotifyLink:
      "https://open.spotify.com/track/38xqzTW8mMLP876PBU3F9F?si=r6QOZ-tMSxq7LhDci6vHIg&utm_source=native-share-menu",
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
  juse: {
    artistName: "JUSE",
    songName: "Space Cowboy",
    launchTimestamp: 1671660000000,
    projectId: Number(process.env.REACT_APP_PROJECT_ID) || 8,
    bundleAmount: 10000,
    totalTokens: 100000000,
    bundlePrice: 17,
    royaltyAgreement:
      "https://pbj4ejxvnvokfyzp67jzx6kiitiupesu5fqtcuiwps64dqfbzqua.arweave" +
      ".net/eFPCJvVtXKLjL_fTm_lIRNFHklTpYTFRFny9wcChzCg",
    poolLink: "https://pool.pm/asset1svv53m94k3c7ne30mcq7vq5yzyvajmtv54rss6",
    spotifyLink:
      "https://open.spotify.com/track/116yVjooI7lrE6V9zSWQFe?si=vDhsDv31QeuWXS1_-H7FeA",
    description:
      "Co-Founder of The Listening Room and SND Education, JUSE is a " +
      "multi-faceted Percussionist, Sound Designer and Music Producer. With " +
      "the aforethought to preserve Intellectual Property (IP) with " +
      "blockchain technology, JUSE is pioneering the way music is " +
      "distributed via fungible and non-fungible tokens!",
    socials: [
      {
        heading: "JUSE",
        twitter: "https://twitter.com/KydJuse",
        soundcloud: "https://soundcloud.com/KydJuse",
        instagram: "https://Instagram.com/KydJuse",
      },
    ],
  },
  abyss: {
    artistName: "Abyss",
    subtitle: "feat. Mikey Mo the MC and The Gr8",
    songName: "Lost In My Own Zone",
    launchTimestamp: 1674234000000,
    projectId: Number(process.env.REACT_APP_PROJECT_ID) || 9,
    bundleAmount: 1000000,
    totalTokens: 100000000,
    bundlePrice: 100,
    royaltyAgreement:
      "https://pw7hecf2owuyxc6ddy3pnmarvv5k4446fnyckpzsr7m26vudp7va.arweave." +
      "net/fb5yCLp1qYuLwx429rARrXquc54rcCU_Mo_Zr1aDf-o",
    poolLink: "https://pool.pm/asset1a4es49gslew40jgewfe457697s70u24tpxmmsc",
    spotifyLink:
      "https://open.spotify.com/album/5HNfh8xo85KZSh9MdIzgyy?si=FBJrqdD5TzC3eGJy3BOikQ",
    description:
      "The Moodswingz Muzik team linked up with Hip Hop artist & Sacramento " +
      "dance legend The Gr8 to bring you this gem! 'Lost In My Own Zone' " +
      "celebrates the importance of finding your 'Zone' - that place where " +
      "you're engulfed in your craft or favorite pastime and nothing else in " +
      "the world matters.\n\n" +
      "To show love to their supporters, 100% of the streaming royalties " +
      "for this record are up for grabs! Get lost in the sonic vibes, and " +
      "lock in your bundles before they're gone!",
    socials: [
      {
        heading: "Abyss",
        twitter: "http://www.twitter.com/abyssbeats",
        instagram: "http://www.instagram.com/officialabyssbeats",
        tikTok: "http://www.tiktok.com/@abyssbeats",
      },
      {
        heading: "Mikey Mo the MC",
        twitter: "http://twitter.com/MikeyMoTheMC",
        facebook: "http://www.facebook.com/MikeyMoTheMC",
        instagram: "http://www.instagram.com/MikeyMoTheMC",
      },
      {
        heading: "The Gr8",
        twitter: "http://twitter.com/thegr8vibe",
        tikTok: "http://www.tiktok.com/@thegr8vibe",
        instagram: "http://www.instagram.com/thegr8vibe",
      },
      {
        heading: "Moodswingz Muzik",
        instagram: "http://www.instagram.com/MoodswingzMuzik",
        website: "http://moodswingzmuzik.com",
      },
    ],
  },
  danketsu: {
    artistName: "Danketsu",
    subtitle: "Daisuke ft. NSTASIA & Mirai Music",
    songName: "Daisuke",
    launchTimestamp: 1675454400000,
    projectId: Number(process.env.REACT_APP_PROJECT_ID) || 11,
    bundleAmount: 10000,
    totalTokens: 100000000,
    bundlePrice: 10,
    royaltyAgreement:
      "https://pcxsaahqv4t66zdoep3t5nemycyybe37di3sytyo45z43mnsu4iq.arweave." +
      "net/eK8gAPCvJ-9kbiP3PrSMwLGAk38aNyxPDudzzbGypxE",
    poolLink: "https://pool.pm/asset1effvlkkw02m9ft3ymlkfld8mhlq05wc2hal5du",
    spotifyLink:
      "https://open.spotify.com/album/2oPlBEr5fkRAbBsFrEkXVE?si=UDqDCTHBRbi3T69WkwpJxA&nd=1",
    description:
      "Danketsu pushes the boundaries of community-driven music in Web3. " +
      "Since 2021, we've onboarded 9 artists to Cardano, including Kyron El, " +
      "Billy Martin, IAGO, Katie Belle, Lenii, EKKO, LeTreez, NSTASIA and " +
      "more to come.\n\n" +
      "Our music production differs from the traditional by putting our " +
      "community first. They get a say in everything from genre, to beats, " +
      "to lyrics, and even provide their own stems and vocals to final " +
      "mixes. Being a part of high-quality music was never so easy.\n\n" +
      "This release tells the story of Danketsu's Daisuke Clan – co-produced " +
      "by Mirai Music and our Ninjaz Community with NSTASIA as lead vocals.\n\n" +
      "You can now co-own a piece of this song, taking the concept of " +
      "community-driven music to the next level. This is the power of " +
      "decentralization!",
    socials: [
      {
        heading: "Danketsu",
        twitter: "https://twitter.com/DanketsuNFT",
        website: "https://www.danketsu.io/",
      },
      {
        heading: "Mirai Music",
        twitter: "https://twitter.com/miraimusicprod",
        instagram: "https://www.instagram.com/miraimusicprod",
        website: "https://www.miraimusicproductions.com",
      },
      {
        heading: "NSTASIA",
        twitter: "https://twitter.com/NastasiaGriffin",
        instagram: "https://www.instagram.com/nastasiagriffin",
        website: "https://www.nstasia.com",
      },
    ],
  },
  awesomeisjayell: {
    artistName: "Awesomeisjayell",
    songName: "Fright Flight",
    launchTimestamp: 1676653200000,
    projectId: Number(process.env.REACT_APP_PROJECT_ID) || 12,
    bundleAmount: 33333,
    totalTokens: 100000000,
    bundlePrice: 17,
    royaltyAgreement:
      "https://qrovagqhgoibtcm54tpiwrx4zruip5lfzuqky5fsgvvdcimlchga.arweave" +
      ".net/hF1QGgczkBmJneTei0b8zGiH9WXNIKx0sjVqMSGLEcw",
    poolLink: "https://pool.pm/asset1ryvx5tzygazn5mw4y0an0l2vqxhjp0f6x9f8pq",
    spotifyLink:
      "https://open.spotify.com/track/3HrTQ4B4yA0lFTyjG2zEe9?si=mQjh3EqzT8WR35POSx-nEA",
    description:
      "Corderius 'awesomeisjayell' Climpson is a revolutionary 'DIY' pioneer " +
      "that has established himself as \"the biggest music artist in the " +
      "metaverse.\"\n\n" +
      "Focused on inspirational music, his tracks are timeless and take " +
      "listeners from the light, to the dark, and truly reflect the " +
      "soundtrack to his life. In his own words, \"Art is life. Art is life " +
      "in general... Music, art and tech go hand-in-hand. They're all parts " +
      "of life.\n\n" +
      "You can now share in the future streaming royalties of this song by " +
      "purchasing Stream Tokens!",
    socials: [
      {
        heading: "Awesomeisjayell",
        twitter: "https://twitter.com/awesomeisjayell",
        youTube: "https://www.youtube.com/@awesomeisjayell",
        website: "https://www.awesomeisjayell.com",
      },
    ],
  },
  oddshapeshadow: {
    artistName: "Oddshapeshadow",
    songName: "Show Me",
    launchTimestamp: 1677859200000,
    projectId: Number(process.env.REACT_APP_PROJECT_ID) || 14,
    bundleAmount: 400000,
    totalTokens: 100000000,
    bundlePrice: 50,
    royaltyAgreement:
      "https://6gpx3w4moxhrl5oc672wznyuzbauhecwdswumkcrt2rzmveuxd3a.arweave" +
      ".net/8Z9924x1zxX1wvf1bLcUyEFDkFYcrUYoUZ6jllSUuPY",
    poolLink: "https://pool.pm/asset1x47rkfwaqhv3aqlc3qa2rzrj3ukzcfqmvzc8f4",
    spotifyLink:
      "https://open.spotify.com/track/2cZOjrm6568Uhennot4uGx?si=94b01925eca74db3",
    description:
      "Oddshapeshadow is an alias that manifested from a love of all genres " +
      "of music. The name reflects my goal to always surprise an audience " +
      "with a range of different styles, and the shadow I cast as a UK-based " +
      "Electronic Producer will always be unpredictable. Over the past " +
      "couple of years, I have found an amazing community within Web3 " +
      "Cardano to collaborate and develop new sounds, and it's been an " +
      "amazing journey that continues to unfold.\n\n" +
      "This new track embodies the passion of sharing your energy and what " +
      "you love with the community. Shout out to all those who have helped " +
      "me build and had fun along the way! Join me in showcasing what NEWM " +
      "can offer to the future of the blockchain-music scene!",
    socials: [
      {
        heading: "Oddshapeshadow",
        discord: "https://discord.gg/kmBWdPsFsk",
        twitter: "https://twitter.com/MGBedford",
        soundcloud: "https://soundcloud.com/oddshapeshadow",
      },
    ],
  },
};

export const projectDetails = projectDetailsMap[artistName];
