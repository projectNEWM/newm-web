import { Buffer } from "buffer";
import { WalletLogos } from "common";
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

export const walletInfo: WalletLogos = {
  nami: {
    name: "Nami",
    logo: namiLogo
  },
  eternl: {
    name: "Eternl",
    logo: eternalLogo,
  },
  flint: {
    name: "Flint",
    logo: flintLogo,
  },
  cardwallet: {
    name: "CardWallet",
    logo: cardwalletLogo,
  },
  gerowallet: {
    name: "GeroWallet",
    logo: gerowalletLogo,
  }
};

export const getWallet = () => {
  const cardano = window.cardano;

  const walletName = supportedWallets.find((wallet) => cardano[wallet]);

  try {
    if (!walletName) {
      throw new Error("Please install a Cardano wallet extension.");
    }

    const wallet = cardano[walletName];

    console.log("buffer: ", Buffer);
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
