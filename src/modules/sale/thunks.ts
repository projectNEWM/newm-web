import { createAsyncThunk } from "@reduxjs/toolkit";
import { createTransaction } from "modules/wallet";
import { RootState } from "store";
import { PurchaseOrderRequest } from "./types";
import saleApi from "./api";

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
    const requestOrderResp = await dispatch(
      saleApi.endpoints.createPurchaseOrder.initiate({
        projectId,
        bundleId,
        receiveAddress,
        paymentType,
      })
    );

    if ("error" in requestOrderResp) return;

    const { paymentAddress, ...data } = requestOrderResp.data.data[1];
    const cost = Number(data.cost.slice(1));
    const appState = getState() as RootState;
    const { walletName } = appState.wallet;

    await createTransaction({
      receiveAddress,
      paymentAddress,
      cost,
      walletName,
    });
  }
);
