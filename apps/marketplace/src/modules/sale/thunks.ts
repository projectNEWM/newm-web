import { createAsyncThunk } from "@reduxjs/toolkit";
import { asThunkHook } from "@newm-web/utils";
import {
  enableWallet,
  getWalletChangeAddress,
  signWalletTransaction,
} from "@newm.io/cardano-dapp-wallet-connector";
import { GenerateOrderRequest } from "./types";
import saleApi from "./api";
import { setToastMessage } from "../ui";

export const purchaseStreamTokens = createAsyncThunk(
  "sale/purchaseStreamTokens",
  async (body: GenerateOrderRequest, { dispatch }) => {
    try {
      const orderResp = await dispatch(
        saleApi.endpoints.generateOrder.initiate(body)
      );

      if ("error" in orderResp || !orderResp.data) return;

      const { orderId, amountCborHex } = orderResp.data;
      const wallet = await enableWallet();
      const changeAddress = await getWalletChangeAddress(wallet);
      const utxoCborHexList = await wallet.getUtxos(amountCborHex);

      if (!utxoCborHexList) {
        throw new Error(
          `Insufficient NEWM tokens in wallet. Please add NEWM tokens to
          your wallet and try again.`
        );
      }

      const transactionResp = await dispatch(
        saleApi.endpoints.generateTransaction.initiate({
          changeAddress,
          orderId,
          utxoCborHexList,
        })
      );

      if ("error" in transactionResp || !transactionResp.data) return;

      const unsignedTransaction = transactionResp.data.txCborHex;
      await signWalletTransaction(wallet, unsignedTransaction);
    } catch (error) {
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

export const usePurchaseStreamTokensThunk = asThunkHook(purchaseStreamTokens);
