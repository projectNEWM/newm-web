import { createAsyncThunk } from "@reduxjs/toolkit";
import { NEWM_ASSET_NAME, NEWM_POLICY_ID, asThunkHook } from "@newm-web/utils";
import {
  enableWallet,
  getWalletChangeAddress,
  getWalletTokenBalance,
  signWalletTransaction,
} from "@newm.io/cardano-dapp-wallet-connector";
import { GenerateOrderRequest } from "@newm-web/types";
import saleApi from "./api";
import { setToastMessage } from "../ui";

export const purchaseStreamTokens = createAsyncThunk(
  "sale/purchaseStreamTokens",
  async (body: GenerateOrderRequest, { dispatch }) => {
    try {
      const wallet = await enableWallet();

      const newmBalance = await getWalletTokenBalance(
        wallet,
        NEWM_POLICY_ID,
        NEWM_ASSET_NAME
      );

      if (!newmBalance) {
        throw new Error(
          `Insufficient NEWM tokens in wallet. Please add NEWM tokens to
          your wallet and try again.`
        );
      }

      const orderResp = await dispatch(
        saleApi.endpoints.generateOrder.initiate(body)
      );

      if ("error" in orderResp || !orderResp.data) return;

      const { orderId, amountCborHex } = orderResp.data;
      const changeAddress = await getWalletChangeAddress(wallet);
      const utxoCborHexList = await wallet.getUtxos(amountCborHex);

      if (!utxoCborHexList) {
        throw new Error(
          "Insufficient balance in wallet. Please add funds and try again."
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
      const signedTransaction = await signWalletTransaction(
        wallet,
        unsignedTransaction
      );

      await wallet.submitTx(signedTransaction);

      dispatch(
        setToastMessage({
          message: "Stream token purchase was successful.",
          severity: "success",
        })
      );
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
