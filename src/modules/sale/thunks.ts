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
import { setIsTransactionCreated, setSaleIsLoading } from "./slice";

/**
 * Sends an receive address to the back-end, and uses that address
 * and the data in the response to construct a transaction.
 */
export const createPurchase = createAsyncThunk(
  "sale/createPurchase",
  async (params: PurchaseOrderParams, { dispatch, getState }) => {
    try {
      dispatch(setWalletIsLoading(true));

      const { projectId, bundleId, paymentType } = params;
      const appState = getState() as RootState;
      const { walletName } = appState.wallet;

      // get receive address from params if manual, and from wallet if not
      const receiveAddress =
        paymentType === PaymentType.Manual
          ? params.receiveAddress
          : await getUnusedAddress(walletName);

      if (!receiveAddress) {
        throw new Error("An error occurred while creating the transaction");
      }

      await dispatch(
        saleApi.endpoints.createPurchaseOrder.initiate({
          projectId,
          bundleId,
          receiveAddress,
          paymentType,
        })
      );

      // get payment variables from updated state
      const updatedAppState = getState() as RootState;
      const { purchaseOrder } = updatedAppState.sale;

      // a API error occurred and no new or existing order was present
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
            ? "Account was changed, please refresh the page"
            : err.message;

        dispatch(
          setToastMessage({
            message: errorMessage,
            severity: "error",
          })
        );
      }
      // transaction not created
    } finally {
      dispatch(setWalletIsLoading(false));
      dispatch(setSaleIsLoading(false));
    }
  }
);
