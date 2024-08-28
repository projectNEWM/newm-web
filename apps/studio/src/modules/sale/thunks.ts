import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  enableWallet,
  getWalletChangeAddress,
  signWalletTransaction,
} from "@newm.io/cardano-dapp-wallet-connector";
import {
  Currency,
  LOVELACE_CONVERSION,
  USD_CONVERSION,
  asThunkHook,
} from "@newm-web/utils";
import { extendedApi as saleApi } from "./api";
import { EndSaleThunkRequest, StartSaleThunkRequest } from "./types";
import { setToastMessage } from "../ui";
import {
  LOCAL_STORAGE_SALE_END_PENDING_KEY,
  LOCAL_STORAGE_SALE_START_PENDING_KEY,
  SALE_END_UPDATED_EVENT,
  SALE_START_UPDATED_EVENT,
} from "../../common";

/**
 * Starts a sale for a song.
 */
export const startSale = createAsyncThunk(
  "sale/start",
  async (body: StartSaleThunkRequest, { dispatch }) => {
    try {
      const wallet = await enableWallet();
      const changeAddress = await getWalletChangeAddress(wallet);

      const costAmount =
        body.saleCurrency === Currency.USD.name
          ? body.costAmount * USD_CONVERSION
          : body.costAmount * LOVELACE_CONVERSION;

      const startSaleAmountResp = await dispatch(
        saleApi.endpoints.startSaleAmount.initiate({
          bundleAmount: body.bundleAmount,
          bundleAssetName: body.bundleAssetName,
          bundlePolicyId: body.bundlePolicyId,
          costAmount,
          costAssetName: Currency[body.saleCurrency].costAssetName,
          costPolicyId: Currency[body.saleCurrency].costPolicyId,
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

      const pendingSales = localStorage.getItem(
        LOCAL_STORAGE_SALE_START_PENDING_KEY
      );
      const newSale = {
        tokensToSell: body.totalBundleQuantity,
        totalSaleValue: body.costAmount,
      };

      if (pendingSales) {
        const parsedPendingSales = JSON.parse(pendingSales);
        parsedPendingSales[body.songId] = newSale;
        localStorage.setItem(
          LOCAL_STORAGE_SALE_START_PENDING_KEY,
          JSON.stringify(parsedPendingSales)
        );
      } else {
        localStorage.setItem(
          LOCAL_STORAGE_SALE_START_PENDING_KEY,
          JSON.stringify({ [body.songId]: newSale })
        );
      }

      window.dispatchEvent(new Event(SALE_START_UPDATED_EVENT));

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

/**
 * Ends a sale for a song.
 */
export const endSale = createAsyncThunk(
  "sale/end",
  async (body: EndSaleThunkRequest, { dispatch }) => {
    try {
      const wallet = await enableWallet();
      const changeAddress = await getWalletChangeAddress(wallet);

      const endSaleAmountResp = await dispatch(
        saleApi.endpoints.endSaleAmount.initiate({
          saleId: body.saleId,
        })
      );

      if ("error" in endSaleAmountResp || !endSaleAmountResp.data) return;

      const { amountCborHex } = endSaleAmountResp.data;

      const utxoCborHexList = await wallet.getUtxos(amountCborHex);

      const endSaleTransactionResp = await dispatch(
        saleApi.endpoints.endSaleTransaction.initiate({
          changeAddress,
          saleId: body.saleId,
          utxoCborHexList,
        })
      );

      if ("error" in endSaleTransactionResp || !endSaleTransactionResp.data)
        return;

      const signedTransaction = await signWalletTransaction(
        wallet,
        endSaleTransactionResp.data.txCborHex,
        true
      );

      await wallet.submitTx(signedTransaction);

      const pendingSaleSongIds = localStorage.getItem(
        LOCAL_STORAGE_SALE_END_PENDING_KEY
      );

      if (pendingSaleSongIds) {
        localStorage.setItem(
          LOCAL_STORAGE_SALE_END_PENDING_KEY,
          JSON.stringify([...JSON.parse(pendingSaleSongIds), body.songId])
        );
      } else {
        localStorage.setItem(
          LOCAL_STORAGE_SALE_END_PENDING_KEY,
          JSON.stringify([body.songId])
        );
      }

      window.dispatchEvent(new Event(SALE_END_UPDATED_EVENT));

      dispatch(
        setToastMessage({
          message: "You have successfully ended the stream token sale.",
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
export const useEndSaleThunk = asThunkHook(endSale);
