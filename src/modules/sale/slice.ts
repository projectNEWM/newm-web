import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  PaymentStatus,
  PaymentType,
  PurchaseOrderResponse,
  SaleBundlesResponse,
  SaleState,
} from "./types";

const initialState: SaleState = {
  sales: [],
  purchaseOrder: undefined,
  paymentType: undefined,
  paymentStatus: undefined,
};

const walletSlice = createSlice({
  initialState,
  name: "sale",
  reducers: {
    receiveBundleSales(state, action: PayloadAction<SaleBundlesResponse>) {
      state.sales = action.payload.data[1].ftSaleBundles;
    },
    receivePurchaseOrder(state, action: PayloadAction<PurchaseOrderResponse>) {
      state.purchaseOrder = action.payload.data[1];
    },
    receivePaymentType(state, action: PayloadAction<PaymentType>) {
      state.paymentType = action.payload;
    },
    receivePaymentStatus(state, action: PayloadAction<PaymentStatus>) {
      state.paymentStatus = action.payload;
    },
    clearPurchase(state) {
      state.purchaseOrder = undefined;
      state.paymentType = undefined;
      state.paymentStatus = undefined;
    },
  },
});

export const {
  receiveBundleSales,
  receivePurchaseOrder,
  receivePaymentType,
  receivePaymentStatus,
  clearPurchase,
} = walletSlice.actions;

export default walletSlice.reducer;
