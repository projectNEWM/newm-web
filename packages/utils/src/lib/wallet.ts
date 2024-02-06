import { EnabledWallet } from "@newm.io/cardano-dapp-wallet-connector";

export const getIsWalletEnvMismatch = async (
  wallet: EnabledWallet,
  isProd: boolean
) => {
  const networkId = await wallet.getNetworkId();
  const isWalletProd = networkId === 1;

  return isProd !== isWalletProd;
};
