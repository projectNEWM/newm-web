import { Profile, SessionState } from "modules/session";
import { EnabledWallet } from "modules/wallet";

const mockAsyncFunction = async () => Promise.resolve();

export const mockProfile: Profile = {
  id: "ABCD1234",
  oauthId: "",
  oauthType: "",
  email: "example@email.com",
  firstName: "John",
  lastName: "Smith",
  nickname: "Johnny",
  pictureUrl: "",
  role: "Producer",
  genre: "Instrumental",
};

export const mockSession: SessionState = {
  isLoggedIn: true,
  errorMessage: "",
  profile: mockProfile,
};

export const mockFile = {
  name: "hello-world.txt",
  size: 1000,
  type: "",
  webkitRelativePath: "/",
  lastModified: 1234567890,
  preview: "",
  arrayBuffer: (() => {}) as any, // eslint-disable-line
  slice: (() => {}) as any, // eslint-disable-line
  stream: (() => {}) as any, // eslint-disable-line
  text: (() => {}) as any, // eslint-disable-line
};

export const mockEnabledWallet: EnabledWallet = {
  experimental: {
    appVersion: {
      major: 1,
      minor: 2,
      patch: 0,
    },
    getCollateral: mockAsyncFunction,
    getLockedUtxos: mockAsyncFunction,
    syncAccount: mockAsyncFunction,
  },
  getBalance: () => new Promise((resolve) => resolve(mockUtxos)),
  getChangeAddress: mockAsyncFunction,
  getCollateral: mockAsyncFunction,
  getNetworkId: mockAsyncFunction,
  getRewardAddresses: mockAsyncFunction,
  getUnusedAddresses: mockAsyncFunction,
  getUsedAddresses: mockAsyncFunction,
  getUtxos: () => new Promise((resolve) => resolve(mockUtxos)),
  signData: mockAsyncFunction,
  signTx: mockAsyncFunction,
  submitTx: mockAsyncFunction,
};

export const mockBalance = "1a18f6c5e3";

export const mockUtxos = [
  "82825820183a3b030b0483f00aa60f1c01c42e73be84446b53a4fd608a0098870681dce600825839016f0c03032e1c8a6300052d353ed1b1dd" +
    "46dce7db61dc7e4e7dc0165c93f4699098eb06f765d1024c8243e6ed75a29a6c5b264e8aa4cf7af31a0a1f55a3",
  "8282582062642fed1090654050d9a8ae5c6dda7fcc4bb5ce0ff617104243c1b916caa8ef008258390150444f83a4c0e7197dbbbd3e561b59f0" +
    "2de3959956132064e29c8b0093f4699098eb06f765d1024c8243e6ed75a29a6c5b264e8aa4cf7af31a02625a00",
  "828258209d328d5ff95e44b73aabb262fc86291c0522d19a8c56dad465e4b4b8c025635f088258390150444f83a4c0e7197dbbbd3e561b59f0" +
    "2de3959956132064e29c8b0093f4699098eb06f765d1024c8243e6ed75a29a6c5b264e8aa4cf7af31a0c751640",
];
