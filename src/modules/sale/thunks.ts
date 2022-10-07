import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTransaction,
  getUnusedAddress,
  setWalletIsLoading,
} from "modules/wallet";
import { RootState } from "store";
import { setToastMessage } from "modules/ui";
import { PaymentType, PurchaseOrderParams } from "./types";
import saleApi from "./api";
import { setIsTransactionCreated } from "./slice";

/**
 * Sends an receive address to the back-end, and uses that address
 * and the data in the response to construct a transaction.
 */
export const createPurchase = createAsyncThunk(
  "sale/createPurchase",
  async (params: PurchaseOrderParams, { dispatch, getState }) => {
    try {
      dispatch(setWalletIsLoading(true));

      // save transaction time, this will be used to handle timeout
      const transactionTime = Date.now();
      localStorage.setItem("transactionCreatedAt", String(transactionTime));

      const { projectId, bundleId, paymentType } = params;
      const appState = getState() as RootState;
      const { walletName } = appState.wallet;

      // get receive address from params if manual, and from wallet if not
      let receiveAddress;
      if (paymentType === PaymentType.Manual) {
        receiveAddress = params.receiveAddress;
      } else {
        receiveAddress = await getUnusedAddress(walletName);
      }

      if (!receiveAddress) {
        throw new Error("An error occurred while creating the purchase order");
      }

      const resp = await dispatch(
        saleApi.endpoints.createPurchaseOrder.initiate({
          projectId,
          bundleId,
          receiveAddress,
          paymentType,
        })
      );

      // 402 error status is ok, otherwise return early if there's an error
      if (
        "error" in resp &&
        "status" in resp.error &&
        resp.error.status !== 402
      ) {
        return;
      }

      // get purchase order from updated state
      const updatedAppState = getState() as RootState;
      const { purchaseOrder } = updatedAppState.sale;

      if (!purchaseOrder) return;

      const { paymentAddress } = purchaseOrder;
      const cost = Number(purchaseOrder.cost.slice(1));

      await createTransaction({
        receiveAddress,
        paymentAddress,
        cost,
        walletName,
      });

      dispatch(setIsTransactionCreated(true));
    } catch (err) {
      // display an error message unless the user cancelled the transaction
      if (
        err instanceof Error &&
        err.message !== "user cancelled transaction"
      ) {
        const errorMessage =
          err.message === "account changed"
            ? "Account changed, please refresh the page"
            : err.message;

        dispatch(
          setToastMessage({
            message: errorMessage,
            severity: "error",
          })
        );
      }
    } finally {
      dispatch(setWalletIsLoading(false));
    }
  }
);
