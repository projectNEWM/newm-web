import { EnabledWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { isProd } from "@newm-web/env";

export const getIsWalletEnvMismatch = async (wallet: EnabledWallet) => {
  const networkId = await wallet.getNetworkId();
  const isWalletProd = networkId === 1;

  return isProd !== isWalletProd;
};
