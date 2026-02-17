import { Buffer } from "buffer";
import { bech32 } from "bech32";
import { EnabledWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { isProd } from "@newm-web/env";

export const getIsWalletEnvMismatch = async (wallet: EnabledWallet) => {
  const networkId = await wallet.getNetworkId();
  const isWalletProd = networkId === 1;

  return isProd !== isWalletProd;
};

export const encodeAddress = (hex: string) => {
  // https://cips.cardano.org/cip/CIP-19
  let prefix;
  switch (hex[0]) {
    case "8":
      throw new Error("Byron addresses not supported");
    case "e":
    case "E":
      prefix = "stake";
      break;
    default:
      prefix = "addr";
      break;
  }
  if (hex[1] === "0") {
    prefix += "_test";
  }
  const bytes = Buffer.from(hex, "hex");
  const words = bech32.toWords(bytes);

  return bech32.encode(prefix, words, 1000);
};
