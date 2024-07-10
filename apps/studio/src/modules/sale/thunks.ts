import { createAsyncThunk } from "@reduxjs/toolkit";
import { enableWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { asThunkHook, encodeAddress } from "@newm-web/utils";
import { extendedApi as saleApi } from "./api";
import { StartSaleThunkRequest } from "./types";

/**
 * Generates an artist agreement and then navigates
 * to the confirmation screen.
 */
export const startSale = createAsyncThunk(
  "sale/start",
  async (body: StartSaleThunkRequest, { dispatch }) => {
    try {
      const wallet = await enableWallet();
      const changeAddress = encodeAddress(await wallet.getChangeAddress());

      const startSaleAmountResp = await dispatch(
        saleApi.endpoints.startSaleAmount.initiate({
          ...body,
          ownerAddress: changeAddress,
        })
      );

      if ("error" in startSaleAmountResp || !startSaleAmountResp.data) return;

      const { saleId, amountCborHex } = startSaleAmountResp.data;

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

      const signedTransaction = await wallet.signTx(
        startSaleTransactionResp.data.txCborHex
      );

      await wallet.submitTx(signedTransaction);

      // TODO: handle success/failure of transaction submission
    } catch (err) {
      // do nothing
      console.error(err);
    }
  }
);

export const useStartSaleThunk = asThunkHook(startSale);
