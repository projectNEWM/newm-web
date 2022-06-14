import { Buffer } from "buffer";
import { Wallets } from "./types";
import namiLogo from "assets/images/nami-logo.svg";
import eternalLogo from "assets/images/eternl-logo.png";
import flintLogo from "assets/images/flint-logo.svg";
import cardwalletLogo from "assets/images/cardwallet-logo.svg";
import gerowalletLogo from "assets/images/gerowallet-logo.png";

export const supportedWallets = [
  "nami",
  "eternl",
  "flint",
  "cardwallet",
  "gerowallet",
];

export const walletInfo: Wallets = {
  nami: {
    name: "Nami",
    logo: namiLogo,
    extensionUrl: "https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo",
    primaryUrl: "https://namiwallet.io/",
  },
  eternl: {
    name: "Eternl",
    logo: eternalLogo,
    extensionUrl: "https://chrome.google.com/webstore/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka",
    primaryUrl: "https://eternl.io/",
  },
  flint: {
    name: "Flint",
    logo: flintLogo,
    extensionUrl: "https://chrome.google.com/webstore/detail/flint-wallet/hnhobjmcibchnmglfbldbfabcgaknlkj",
    primaryUrl: "https://flint-wallet.com/",
  },
  cardwallet: {
    name: "CardWallet",
    logo: cardwalletLogo,
    extensionUrl: "https://chrome.google.com/webstore/detail/cwallet/apnehcjmnengpnmccpaibjmhhoadaico",
    primaryUrl: "https://cwallet.finance/",
  },
  gerowallet: {
    name: "GeroWallet",
    logo: gerowalletLogo,
    extensionUrl: "https://chrome.google.com/webstore/detail/gerowallet/bgpipimickeadkjlklgciifhnalhdjhe",
    primaryUrl: "https://gerowallet.io/",
  }
};

export const getWallet = (walletId: string) => {
  const cardano = window.cardano;

  try {
    if (!window.cardano) {
      throw new Error("No cardano object found on the window.");
    }

    const wallet = cardano[walletId];
    
    console.log("wallet: ", wallet);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message); // eslint-disable-line
    }
  }
};

// 1 = Mainnet, 0 = Testnet
const network_mode = 1;

const protocolParameters = {
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

const toHex = (bytes: string) => {
  return Buffer.from(bytes).toString("hex");
};

const fromAscii = (hex: string) => {
  return Buffer.from(hex).toString("hex");
};

const toUint8Array = (cbor: string) => {
  return Uint8Array.from(Buffer.from(cbor, "hex"));
};
