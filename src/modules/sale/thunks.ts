import { createAsyncThunk } from "@reduxjs/toolkit";
import { createTransaction, setWalletIsLoading } from "modules/wallet";
import { RootState } from "store";
import { PurchaseOrderRequest } from "./types";
import saleApi from "./api";
import { setIsTransactionCreated, setSaleIsLoading } from "./slice";

/**
 * Sends an receive address to the back-end, and uses that address
 * and the data in the response to construct a transaction.
 */
export const createPurchase = createAsyncThunk(
  "sale/createPurchase",
  async (
    { projectId, bundleId, receiveAddress, paymentType }: PurchaseOrderRequest,
    { dispatch, getState }
  ) => {
    await dispatch(
      saleApi.endpoints.createPurchaseOrder.initiate({
        projectId,
        bundleId,
        receiveAddress,
        paymentType,
      })
    );

    // get payment variables from updated state
    const appState = getState() as RootState;
    const {
      sale: { purchaseOrder },
      wallet: { walletName },
    } = appState;

    if (!purchaseOrder) return;

    const { paymentAddress } = purchaseOrder;
    const cost = Number(purchaseOrder.cost.slice(1));

    try {
      dispatch(setWalletIsLoading(true));

      await createTransaction({
        receiveAddress,
        paymentAddress,
        cost,
        walletName,
      });

      dispatch(setIsTransactionCreated(true));
    } catch (e) {
      // transaction not created
    } finally {
      dispatch(setWalletIsLoading(false));
      dispatch(setSaleIsLoading(false));
    }
  }
);
