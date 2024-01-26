// TODO: debug why importing here doesn't resolve linting errors in test files
import "@testing-library/jest-dom";

jest.mock("@newm-web/env", () => ({
  VITE_GOOGLE_CLIENT_ID: "EXAMPLE_ID",
  NX_CLOUD_ACCESS_TOKEN: "EXAMPLE_TOKEN",
  NODE_ENV: "test",
  VITE_ENV: "test"
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
