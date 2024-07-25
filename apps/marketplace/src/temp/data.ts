import { Sale, SaleStatus } from "@newm-web/types";

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
  id: "123",
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
  stageName: "Dr. Shrimp Puerto Rico",
  websiteUrl: "https://www.example.com",
  xUrl: "https://www.example.com",
};

export const mockArtists = Array(10)
  .fill(mockArtist)
  .map((artist, idx) => ({
    ...artist,
    id: artist.id + idx,
    profileImageUrl:
      idx % 2 == 0
        ? "https://res.cloudinary.com/newm/image/upload/v1701715430/pzeo4bcivjouksomeggy.jpg"
        : "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1695587661/mprskynp42oijtpaypeq.jpg",
  }));

const mockArtistFullName = `${mockArtist.firstName} ${mockArtist.lastName}`;
const mockArtistName = mockArtist.stageName || mockArtistFullName;

export const mockSales: ReadonlyArray<Sale> = [
  {
    availableBundleQuantity: 100000000,
    bundleAmount: 1,
    bundleAssetName: "ABCD1234",
    bundlePolicyId: "1234ABCD",
    costAmount: 3,
    costAmountUsd: 0.015,
    costAssetName: "XYZ123",
    costPolicyId: "123XYZ",
    createdAt: new Date("April 10th, 2024").toDateString(),
    id: "cec4f704-69c4-41fd-807d-47aa2d73f0d2",
    maxBundleSize: 1,
    song: {
      artistId: "3cfb2d02-a320-4385-96d1-1498d8a1df58",
      artistName: mockArtistName,
      artistPictureUrl:
        "https://res.cloudinary.com/newm/image/upload/v1701715430/pzeo4bcivjouksomeggy.jpg",
      assetUrl: "https://pool.pm/asset10k9w7tt0khmve76ukggk5vftwcsfh2vtdkxx5p",
      clipUrl:
        "https://asset1lret95e9jyr8y6ry83x447y6xjjmxgsppluuht.poolpm.nftcdn.io/files/0/?tk=1wCx2KO2FeZz5855Mqqhk6Ymuefgoh0E1gyEItGXtHw",
      collaborators: [],
      coverArtUrl:
        "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1706033133/efpgmcjwk8glctlwfzm8.png",
      description: `
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
      natoque penatibus et magnis dis parturient montes, nascetur 
      ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, 
      pretium.`,
      genres: ["Punk"],
      id: "3cfb2d02-a320-4385-96d1-1498d8a1df58",
      isExplicit: true,
      moods: [],
      title: "Vibrate Punk",
      tokenAgreementUrl: "http://example.com",
    },
    status: SaleStatus.Started,
    totalBundleQuantity: 100000000,
  },
  {
    availableBundleQuantity: 100000000,
    bundleAmount: 1,
    bundleAssetName: "ABCD1234",
    bundlePolicyId: "1234ABCD",
    costAmount: 3,
    costAmountUsd: 0.015,
    costAssetName: "XYZ123",
    costPolicyId: "123XYZ",
    createdAt: new Date("April 10th, 2024").toDateString(),
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df58",
    maxBundleSize: 1,
    song: {
      artistId: "3cfb2d02-a320-4385-96d1-1498d8a1df58",
      artistName: mockArtistName,
      artistPictureUrl:
        "https://res.cloudinary.com/newm/image/upload/v1701715430/pzeo4bcivjouksomeggy.jpg",
      assetUrl: "https://pool.pm/asset10k9w7tt0khmve76ukggk5vftwcsfh2vtdkxx5p",
      clipUrl:
        "https://asset1effvlkkw02m9ft3ymlkfld8mhlq05wc2hal5du.newm.nftcdn.io/files/0?tk=13GWPr-C3hRfdkrfy-adwYVHFwNr4pieLik3GxpRr5s",
      collaborators: [],
      coverArtUrl:
        "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1706033133/efpgmcjwk8glctlwfzm8.png",
      description: `
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
      natoque penatibus et magnis dis parturient montes, nascetur 
      ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, 
      pretium.`,
      genres: ["Punk"],
      id: "3cfb2d02-a320-4385-96d1-1498d8a1df581",
      isExplicit: false,
      moods: [],
      title: "Vibrate Punk",
      tokenAgreementUrl: "http://example.com",
    },
    status: SaleStatus.Started,
    totalBundleQuantity: 100000000,
  },
  {
    availableBundleQuantity: 100000000,
    bundleAmount: 1,
    bundleAssetName: "ABCD1234",
    bundlePolicyId: "1234ABCD",
    costAmount: 3,
    costAmountUsd: 0.015,
    costAssetName: "XYZ123",
    costPolicyId: "123XYZ",
    createdAt: new Date("April 10th, 2024").toDateString(),
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df58",
    maxBundleSize: 1,
    song: {
      artistId: "3cfb2d02-a320-4385-96d1-1498d8a1df58",
      artistName: mockArtistName,
      artistPictureUrl:
        "https://res.cloudinary.com/newm/image/upload/v1701715430/pzeo4bcivjouksomeggy.jpg",
      assetUrl: "https://pool.pm/asset10k9w7tt0khmve76ukggk5vftwcsfh2vtdkxx5p",
      clipUrl:
        "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
      collaborators: [],
      coverArtUrl:
        "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1706033133/efpgmcjwk8glctlwfzm8.png",
      description: `
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
    natoque penatibus et magnis dis parturient montes, nascetur 
    ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, 
    pretium.`,
      genres: ["Punk"],
      id: "3cfb2d02-a320-4385-96d1-1498d8a1df582",
      isExplicit: true,
      moods: [],
      title: "Vibrate Punk",
      tokenAgreementUrl: "http://example.com",
    },
    status: SaleStatus.Started,
    totalBundleQuantity: 100000000,
  },
  {
    availableBundleQuantity: 100000000,
    bundleAmount: 1,
    bundleAssetName: "ABCD1234",
    bundlePolicyId: "1234ABCD",
    costAmount: 3,
    costAmountUsd: 0.015,
    costAssetName: "XYZ123",
    costPolicyId: "123XYZ",
    createdAt: new Date("April 10th, 2024").toDateString(),
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df58",
    maxBundleSize: 1,
    song: {
      artistId: "3cfb2d02-a320-4385-96d1-1498d8a1df58",
      artistName: mockArtistName,
      artistPictureUrl:
        "https://res.cloudinary.com/newm/image/upload/v1701715430/pzeo4bcivjouksomeggy.jpg",
      assetUrl: "https://pool.pm/asset10k9w7tt0khmve76ukggk5vftwcsfh2vtdkxx5p",
      clipUrl:
        "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
      collaborators: [],
      coverArtUrl:
        "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1699544008/xrcmyar9m09mk3l9mo1o.png",
      description: `
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
    natoque penatibus et magnis dis parturient montes, nascetur 
    ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, 
    pretium.`,
      genres: ["Punk"],
      id: "3cfb2d02-a320-4385-96d1-1498d8a1df583",
      isExplicit: false,
      moods: [],
      title: "Vibrate Punk",
      tokenAgreementUrl: "http://example.com",
    },
    status: SaleStatus.Started,
    totalBundleQuantity: 100000000,
  },
  {
    availableBundleQuantity: 100000000,
    bundleAmount: 1,
    bundleAssetName: "ABCD1234",
    bundlePolicyId: "1234ABCD",
    costAmount: 3,
    costAmountUsd: 0.015,
    costAssetName: "XYZ123",
    costPolicyId: "123XYZ",
    createdAt: new Date("April 10th, 2024").toDateString(),
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df58",
    maxBundleSize: 1,
    song: {
      artistId: "3cfb2d02-a320-4385-96d1-1498d8a1df58",
      artistName: mockArtistName,
      artistPictureUrl:
        "https://res.cloudinary.com/newm/image/upload/v1701715430/pzeo4bcivjouksomeggy.jpg",
      assetUrl: "https://pool.pm/asset10k9w7tt0khmve76ukggk5vftwcsfh2vtdkxx5p",
      clipUrl:
        "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
      collaborators: [],
      coverArtUrl:
        "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1699580048/aw7w0kielduse0z4vavi.png",
      description: `
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
    natoque penatibus et magnis dis parturient montes, nascetur 
    ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, 
    pretium.`,
      genres: ["Punk"],
      id: "3cfb2d02-a320-4385-96d1-1498d8a1df584",
      isExplicit: true,
      moods: [],
      title: "Vibrate Punk",
      tokenAgreementUrl: "http://example.com",
    },
    status: SaleStatus.Started,
    totalBundleQuantity: 100000000,
  },
  {
    availableBundleQuantity: 100000000,
    bundleAmount: 1,
    bundleAssetName: "ABCD1234",
    bundlePolicyId: "1234ABCD",
    costAmount: 3,
    costAmountUsd: 0.015,
    costAssetName: "XYZ123",
    costPolicyId: "123XYZ",
    createdAt: new Date("April 10th, 2024").toDateString(),
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df58",
    maxBundleSize: 1,
    song: {
      artistId: "3cfb2d02-a320-4385-96d1-1498d8a1df58",
      artistName: mockArtistName,
      artistPictureUrl:
        "https://res.cloudinary.com/newm/image/upload/v1701715430/pzeo4bcivjouksomeggy.jpg",
      assetUrl: "https://pool.pm/asset10k9w7tt0khmve76ukggk5vftwcsfh2vtdkxx5p",
      clipUrl:
        "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
      collaborators: [],
      coverArtUrl:
        "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1701892098/rka1mlzzad6ohrcfqef3.png",
      description: `
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
    natoque penatibus et magnis dis parturient montes, nascetur 
    ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, 
    pretium.`,
      genres: ["Punk"],
      id: "3cfb2d02-a320-4385-96d1-1498d8a1df585",
      isExplicit: false,
      moods: [],
      title: "Vibrate Punk",
      tokenAgreementUrl: "http://example.com",
    },
    status: SaleStatus.Started,
    totalBundleQuantity: 100000000,
  },
  {
    availableBundleQuantity: 100000000,
    bundleAmount: 1,
    bundleAssetName: "ABCD1234",
    bundlePolicyId: "1234ABCD",
    costAmount: 3,
    costAmountUsd: 0.015,
    costAssetName: "XYZ123",
    costPolicyId: "123XYZ",
    createdAt: new Date("April 10th, 2024").toDateString(),
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df58",
    maxBundleSize: 1,
    song: {
      artistId: "3cfb2d02-a320-4385-96d1-1498d8a1df58",
      artistName: mockArtistName,
      artistPictureUrl:
        "https://res.cloudinary.com/newm/image/upload/v1701715430/pzeo4bcivjouksomeggy.jpg",
      assetUrl: "https://pool.pm/asset10k9w7tt0khmve76ukggk5vftwcsfh2vtdkxx5p",
      clipUrl:
        "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
      collaborators: [],
      coverArtUrl:
        "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1702264297/ql6f3j5tettsbc3moea3.png",
      description: `
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
    natoque penatibus et magnis dis parturient montes, nascetur 
    ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, 
    pretium.`,
      genres: ["Punk"],
      id: "3cfb2d02-a320-4385-96d1-1498d8a1df586",
      isExplicit: true,
      moods: [],
      title: "Vibrate Punk",
      tokenAgreementUrl: "http://example.com",
    },
    status: SaleStatus.Started,
    totalBundleQuantity: 100000000,
  },
  {
    availableBundleQuantity: 100000000,
    bundleAmount: 1,
    bundleAssetName: "ABCD1234",
    bundlePolicyId: "1234ABCD",
    costAmount: 3,
    costAmountUsd: 0.015,
    costAssetName: "XYZ123",
    costPolicyId: "123XYZ",
    createdAt: new Date("April 10th, 2024").toDateString(),
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df58",
    maxBundleSize: 1,
    song: {
      artistId: "3cfb2d02-a320-4385-96d1-1498d8a1df58",
      artistName: mockArtistName,
      artistPictureUrl:
        "https://res.cloudinary.com/newm/image/upload/v1701715430/pzeo4bcivjouksomeggy.jpg",
      assetUrl: "https://pool.pm/asset10k9w7tt0khmve76ukggk5vftwcsfh2vtdkxx5p",
      clipUrl:
        "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
      collaborators: [],
      coverArtUrl:
        "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1702264297/ql6f3j5tettsbc3moea3.png",
      description: `
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
    natoque penatibus et magnis dis parturient montes, nascetur 
    ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, 
    pretium.`,
      genres: ["Punk"],
      id: "3cfb2d02-a320-4385-96d1-1498d8a1df587",
      isExplicit: false,
      moods: [],
      title: "Vibrate Punk",
      tokenAgreementUrl: "http://example.com",
    },
    status: SaleStatus.Started,
    totalBundleQuantity: 100000000,
  },
];

export const mockSale = mockSales[0];
