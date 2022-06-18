import { Buffer } from "buffer";
import namiLogo from "assets/images/nami-logo.svg";
import eternalLogo from "assets/images/eternl-logo.png";
import flintLogo from "assets/images/flint-logo.svg";
import cardwalletLogo from "assets/images/cardwallet-logo.svg";
import gerowalletLogo from "assets/images/gerowallet-logo.png";
import * as ASM from "@emurgo/cardano-serialization-lib-asmjs";
import { Wallets } from "./types";

export const supportedWallets = [
  "nami",
  "eternl",
  "flint",
  "cardwallet",
  "gerowallet",
];

export const walletInfo: Wallets = {
  nami: {
    name: "nami",
    displayName: "Nami",
    logo: namiLogo,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo",
    primaryUrl: "https://namiwallet.io/",
  },
  eternl: {
    name: "eternl",
    displayName: "Eternl",
    logo: eternalLogo,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka",
    primaryUrl: "https://eternl.io/",
  },
  flint: {
    name: "flint",
    displayName: "Flint",
    logo: flintLogo,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/flint-wallet/hnhobjmcibchnmglfbldbfabcgaknlkj",
    primaryUrl: "https://flint-wallet.com/",
  },
  cardwallet: {
    name: "cardwallet",
    displayName: "CardWallet",
    logo: cardwalletLogo,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/cwallet/apnehcjmnengpnmccpaibjmhhoadaico",
    primaryUrl: "https://cwallet.finance/",
  },
  gerowallet: {
    name: "gerowallet",
    displayName: "GeroWallet",
    logo: gerowalletLogo,
    extensionUrl:
      "https://chrome.google.com/webstore/detail/gerowallet/bgpipimickeadkjlklgciifhnalhdjhe",
    primaryUrl: "https://gerowallet.io/",
  },
};

/**
 * Ensures the Wallets object is accessible on the window
 * so that it can be used to store the wallet API.
 */
export const initializeWallets = () => {
  if (!window.Wallets) {
    window.Wallets = {};
  }
};

/**
 * Attempts to an enable a wallet. If successful, updates
 * the window.Wallets object with the enabled wallet API.
 *
 * @returns true if the wallet was enabled successfully
 */
export const enableWallet = async (walletName: string): Promise<any> => {
  const { cardano } = window;

  if (!cardano) {
    throw new Error("No cardano object found on the window.");
  }

  const unitializedWallet = cardano[walletName];

  if (!window.Wallets) {
    window.Wallets = {};
  }

  try {
    if (!window.Wallets[walletName]) {
      window.Wallets[walletName] = await unitializedWallet.enable();
    }
  } catch (error) {
    if (
      error instanceof Error &&
      error.message !== "user canceled connection"
    ) {
      throw new Error("Could not connect to the wallet");
    }
  }

  return await window.Wallets[walletName];
};

/**
 * @returns the current wallet balance as an integer.
 */
export const getBalance = async (walletName: string) => {
  const wallet = selectInitializedWallet(walletName);

  return await new Promise((resolve) => {
    return wallet.getBalance().then((hex: string) => {
      console.log("balance hex: ", hex);
      const balance = ASM.Value.from_bytes(fromHex(hex));
      const lovelaces = balance.coin().to_str();
      const amount = Number(lovelaces);

      resolve(amount);
    });
  });
};

/**
 * @returns the wallet utxo amounts as an array of integers.
 */
export const getUtxos = async (walletName: string) => {
  const wallet = selectInitializedWallet(walletName);
  const utxos = await wallet.getUtxos();

  return utxos.map((hex: string) => {
    console.log("utxo hex: ", hex);
    const utxo = ASM.TransactionUnspentOutput.from_bytes(fromHex(hex));
    const lovelaces = utxo.output().amount().coin().to_str();
    const amount = Number(lovelaces);

    return amount;
  });
};

export const selectInitializedWallet = (walletName: string) => {
  if (!window.Wallets) {
    throw new Error("Wallets has not been initialized");
  }

  if (!window.Wallets[walletName]) {
    throw new Error("Wallet has not been initialized");
  }

  return window.Wallets[walletName];
};

// 1 = Mainnet, 0 = Testnet
// const network_mode = 0;

export const protocolParameters = {
  linearFee: {
    minFeeA: "44",
    minFeeB: "155381",
  },
  minUtxo: "1000000",
  poolDeposit: "500000000",
  keyDeposit: "2000000",
  maxValSize: "5000",
  maxTxSize: 16384,
  costPerWord: "34482",
};

const fromHex = (hex: string) => {
  return Buffer.from(hex, "hex");
};

// const toHex = (bytes: string) => {
//   return Buffer.from(bytes).toString("hex");
// };

// const fromAscii = (hex: string) => {
//   return Buffer.from(hex).toString("hex");
// };

// const toUint8Array = (cbor: string) => {
//   return Uint8Array.from(Buffer.from(cbor, "hex"));
// };
