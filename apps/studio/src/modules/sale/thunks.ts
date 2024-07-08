import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  enableWallet,
  getWalletChangeAddress,
  signWalletTransaction,
} from "@newm.io/cardano-dapp-wallet-connector";
import { asThunkHook } from "@newm-web/utils";
import { extendedApi as saleApi } from "./api";
import { StartSaleAmountRequest } from "./types";

/**
 * Generates an artist agreement and then navigates
 * to the confirmation screen.
 */
export const startSale = createAsyncThunk(
  "sale/start",
  async (body: StartSaleAmountRequest, { dispatch }) => {
    try {
      const startSaleAmountResp = await dispatch(
        saleApi.endpoints.startSaleAmount.initiate(body)
      );

      if ("error" in startSaleAmountResp || !startSaleAmountResp.data) return;

      const { saleId, amountCborHex } = startSaleAmountResp.data;
      const wallet = await enableWallet();
      const changeAddress = await getWalletChangeAddress(wallet);
      const utxoCborHexList = await wallet.getUtxos(amountCborHex);

      if (!utxoCborHexList) {
        throw new Error(
          "Insufficient NEWM in wallet. Please add NEWM to your wallet and try again."
        );
      }

      const startSaleTransactionResp = await dispatch(
        saleApi.endpoints.startSaleTransaction.initiate({
          changeAddress,
          saleId,
          utxoCborHexList,
        })
      );

      if ("error" in startSaleTransactionResp || !startSaleTransactionResp.data)
        return;

      const unsignedTransaction = startSaleTransactionResp.data.txCborHex;
      const signedTransaction = await signWalletTransaction(
        wallet,
        unsignedTransaction
      );

      await wallet.submitTx(signedTransaction);

      // TODO: handle success/failure of transaction submission
    } catch (err) {
      // do nothing
    }
  }
);

export const useStartSaleThunk = asThunkHook(startSale);
