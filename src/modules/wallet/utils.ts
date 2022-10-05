import { Buffer } from "buffer";
import { isProd } from "buildParams";
import namiLogo from "assets/images/nami-logo.svg";
import eternalLogo from "assets/images/eternl-logo.png";
import flintLogo from "assets/images/flint-logo.svg";
import cardwalletLogo from "assets/images/cardwallet-logo.svg";
import gerowalletLogo from "assets/images/gerowallet-logo.png";
import {
  Address,
  BigNum,
  CoinSelectionStrategyCIP2,
  LinearFee,
  Transaction,
  TransactionBuilder,
  TransactionBuilderConfigBuilder,
  TransactionOutputBuilder,
  TransactionUnspentOutput,
  TransactionUnspentOutputs,
  TransactionWitnessSet,
  Value,
} from "@dcspark/cardano-multiplatform-lib-asmjs";
import { CreateTransactionParams, EnabledWallet, Wallets } from "./types";

// 1 = Mainnet, 0 = Testnet
const networkMode = isProd ? 1 : 0;

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

export const ensureWallets = () => {
  if (!window.Wallets) {
    window.Wallets = {};
  }
};

export const createTransaction = async (body: CreateTransactionParams) => {
  const wallet = window.Wallets[body.walletName];

  if (!wallet) {
    throw new Error("wallet not enabled");
  }

  const networkId = await wallet.getNetworkId();
  if (networkId !== networkMode) {
    throw new Error("Wallet network mode does not match page network mode");
  }

  const changeAddressCbor = await wallet.getChangeAddress();
  const changeAddress = Address.from_bytes(
    Uint8Array.from(fromHex(changeAddressCbor))
  );

  const txBuilder = TransactionBuilder.new(
    TransactionBuilderConfigBuilder.new()
      .fee_algo(
        LinearFee.new(
          BigNum.from_str(protocolParameters.linearFee.minFeeA),
          BigNum.from_str(protocolParameters.linearFee.minFeeB)
        )
      )
      .pool_deposit(BigNum.from_str(protocolParameters.poolDeposit))
      .key_deposit(BigNum.from_str(protocolParameters.keyDeposit))
      .coins_per_utxo_word(BigNum.from_str(protocolParameters.costPerWord))
      .max_value_size(protocolParameters.maxValSize)
      .max_tx_size(protocolParameters.maxTxSize)
      .build()
  );

  const paymentAddress = Address.from_bech32(body.paymentAddress);
  const cost = body.cost * 1000000;

  txBuilder.add_output(
    TransactionOutputBuilder.new()
      .with_address(paymentAddress)
      .next()
      .with_coin(BigNum.from_str(cost.toString()))
      .build()
  );

  const inputs = TransactionUnspentOutputs.new();
  const utxos = await wallet.getUtxos();
  utxos.map((utxo: string) =>
    inputs.add(TransactionUnspentOutput.from_bytes(fromHex(utxo)))
  );

  try {
    txBuilder.add_inputs_from(
      inputs,
      CoinSelectionStrategyCIP2.LargestFirstMultiAsset
    );
  } catch (err) {
    throw new Error(
      `Sorry, we were not able to build a successful transaction at this time. 
      This may be due to your wallet lacking the necessary asset(s) or token 
      fragmentation.`
    );
  }

  try {
    txBuilder.add_change_if_needed(changeAddress);
  } catch (err) {
    txBuilder.add_output(
      TransactionOutputBuilder.new()
        .with_address(changeAddress)
        .next()
        .with_coin(BigNum.from_str("1000000"))
        .build()
    );
    txBuilder.add_inputs_from(
      inputs,
      CoinSelectionStrategyCIP2.LargestFirstMultiAsset
    );

    try {
      txBuilder.add_change_if_needed(changeAddress);
    } catch (err) {
      throw new Error(
        "Sorry, we were not able to build a successful transaction at this time."
      );
    }
  }

  const transactionWitnessSet = TransactionWitnessSet.new();
  const txBody = txBuilder.build();
  const tx = Transaction.new(
    txBody,
    TransactionWitnessSet.from_bytes(transactionWitnessSet.to_bytes())
  );

  try {
    const txVkeyWitnesses = await wallet.signTx(toHex(tx.to_bytes()), true);
    const witnesses = TransactionWitnessSet.from_bytes(
      fromHex(txVkeyWitnesses)
    );

    const witnessesKeys = witnesses.vkeys();
    if (witnessesKeys) {
      transactionWitnessSet.set_vkeys(witnessesKeys);
    }

    const signedTx = Transaction.new(tx.body(), transactionWitnessSet);

    try {
      await wallet.submitTx(toHex(signedTx.to_bytes()));
    } catch (err) {
      throw new Error("Error during submission?");
    }
  } catch (err) {
    throw new Error("user cancelled transaction");
  }
};

/**
 * @returns the first unused address for a wallet.
 */
export const getUnusedAddress = async (walletName: string): Promise<string> => {
  const addresses = await window.Wallets[walletName].getUnusedAddresses();
  const encodedAddress = addressFromHex(addresses[0]);

  return encodedAddress;
};

/**
 * @returns the current wallet balance as an integer.
 */
export const getBalance = async (walletName: string): Promise<number> => {
  const wallet = selectConnectedWallet(walletName);

  return await new Promise((resolve) => {
    return wallet.getBalance().then((hex: string) => {
      const balance = Value.from_bytes(fromHex(hex));
      const lovelaces = balance.coin().to_str();
      const amount = Number(lovelaces);

      resolve(amount);
    });
  });
};

/**
 * @returns the wallet utxo amounts as an array of integers.
 */
export const getUtxos = async (
  walletName: string
): Promise<ReadonlyArray<number>> => {
  const wallet = selectConnectedWallet(walletName);
  const utxos = await wallet.getUtxos();

  return utxos.map((hex: string) => {
    const utxo = TransactionUnspentOutput.from_bytes(fromHex(hex));
    const lovelaces = utxo.output().amount().coin().to_str();
    const amount = Number(lovelaces);

    return amount;
  });
};

export const selectConnectedWallet = (walletName: string): EnabledWallet => {
  return window.cardano[walletName];
};

export const protocolParameters = {
  linearFee: {
    minFeeA: "44",
    minFeeB: "155381",
  },
  minUtxo: "1000000",
  poolDeposit: "500000000",
  keyDeposit: "2000000",
  maxValSize: 5000,
  maxTxSize: 16384,
  costPerWord: "34482",
};

export const addressFromHex = (hex: string) => {
  return Address.from_bytes(Buffer.from(hex, "hex")).to_bech32();
};

export const fromHex = (hex: string) => {
  return Buffer.from(hex, "hex");
};

const toHex = (bytes: Uint8Array) => {
  return Buffer.from(bytes).toString("hex");
};

export const adaToUsd = (ada: number, conversionRate: number) => {
  return Math.round(ada * conversionRate * 100) / 100;
};

// const fromAscii = (hex: string) => {
//   return Buffer.from(hex).toString("hex");
// };

// const toUint8Array = (cbor: string) => {
//   return Uint8Array.from(Buffer.from(cbor, "hex"));
// };
