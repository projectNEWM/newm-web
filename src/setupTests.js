import "@testing-library/jest-dom";

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
    getSupportedWallets: jest.fn(),
  })),
}));
