// TODO: debug why importing here doesn't resolve linting errors in test files
import "@testing-library/jest-dom";

jest.mock("@newm-web/env", () => ({
  APPLE_CLIENT_ID: "EXAMPLE_ID",
  GOOGLE_CLIENT_ID: "EXAMPLE_ID",
  GA_STUDIO_ID: "EXAMPLE_ID",
  NX_CLOUD_ACCESS_TOKEN: "EXAMPLE_TOKEN",
  NODE_ENV: "test",
  ENV: "test",
  isProd: false
}));

jest.mock("@newm.io/cardano-dapp-wallet-connector", () => ({
  ...jest.requireActual,
  getWalletBalance: jest.fn(),
  useConnectWallet: jest.fn(() => ({
    wallet: {},
    connect: jest.fn(),
    disconnect: jest.fn(),
    isLoading: false,
    getAddress: jest.fn(),
    getBalance: jest.fn(),
    getSupportedWallets: jest.fn()
  }))
}));

jest.mock("react-audio-visualize", () => ({
  ...jest.requireActual("react-audio-visualize"),
  AudioVisualizer: jest.fn()
}));
