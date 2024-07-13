import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  enableWallet,
  signWalletTransaction,
} from "@newm.io/cardano-dapp-wallet-connector";
import {
  NEWM_DECIMAL_CONVERSION,
  asThunkHook,
  encodeAddress,
} from "@newm-web/utils";
import { extendedApi as saleApi } from "./api";
import { StartSaleThunkRequest } from "./types";
import { setToastMessage } from "../ui";
import {
  LOCAL_STORAGE_PENDING_SALES_KEY,
  PENDING_SALES_UPDATED_EVENT,
} from "../../common";

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
          bundleAmount: body.bundleAmount,
          bundleAssetName: body.bundleAssetName,
          bundlePolicyId: body.bundlePolicyId,
          costAmount: body.costAmount * NEWM_DECIMAL_CONVERSION,
          ownerAddress: changeAddress,
          totalBundleQuantity: body.totalBundleQuantity,
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

      const signedTransaction = await signWalletTransaction(
        wallet,
        startSaleTransactionResp.data.txCborHex,
        true
      );

      await wallet.submitTx(signedTransaction);

      const pendingSaleSongIds = localStorage.getItem(
        LOCAL_STORAGE_PENDING_SALES_KEY
      );

      if (pendingSaleSongIds) {
        localStorage.setItem(
          LOCAL_STORAGE_PENDING_SALES_KEY,
          JSON.stringify([...JSON.parse(pendingSaleSongIds), body.songId])
        );
      } else {
        localStorage.setItem(
          LOCAL_STORAGE_PENDING_SALES_KEY,
          JSON.stringify([body.songId])
        );
      }

      window.dispatchEvent(new Event(PENDING_SALES_UPDATED_EVENT));

      dispatch(
        setToastMessage({
          message: "You have commenced creation of the stream token sale.",
          severity: "success",
        })
      );
    } catch (error) {
      // non-endpoint related error occur, show toast
      if (error instanceof Error) {
        dispatch(
          setToastMessage({
            message: error.message,
            severity: "error",
          })
        );
      }
    }
  }
);

export const useStartSaleThunk = asThunkHook(startSale);
