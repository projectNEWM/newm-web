import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  PaymentType,
  PurchaseOrderResponse,
  PurchaseStatus,
  SaleBundlesResponse,
  SaleState,
} from "./types";

const initialState: SaleState = {
  sales: [],
  purchaseOrder: undefined,
  paymentType: undefined,
  purchaseStatus: undefined,
  isTransactionCreated: false,
};

const saleSlice = createSlice({
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
    receivePurchaseStatus(state, action: PayloadAction<PurchaseStatus>) {
      state.purchaseStatus = action.payload;
    },
    setIsTransactionCreated(state, action: PayloadAction<boolean>) {
      state.isTransactionCreated = action.payload;
    },
    clearPurchase(state) {
      state.purchaseOrder = undefined;
      state.paymentType = undefined;
      state.purchaseStatus = undefined;
      state.isTransactionCreated = false;
    },
  },
});

export const {
  receiveBundleSales,
  receivePurchaseOrder,
  receivePaymentType,
  receivePurchaseStatus,
  setIsTransactionCreated,
  clearPurchase,
} = saleSlice.actions;

export default saleSlice.reducer;
