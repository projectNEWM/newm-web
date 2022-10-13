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
  selectedBundleId: undefined,
  purchaseOrder: undefined,
  paymentType: undefined,
  purchaseStatus: undefined,
  isTransactionCreated: false,
  isLoading: false,
};

const saleSlice = createSlice({
  initialState,
  name: "sale",
  reducers: {
    receiveBundleSales(state, action: PayloadAction<SaleBundlesResponse>) {
      const sales = action.payload.data[1].ftSaleBundles;
      state.sales = sales;
      state.selectedBundleId = state.selectedBundleId || sales[0]?.id;
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
    setSelectedBundleId(state, action: PayloadAction<number>) {
      state.selectedBundleId = action.payload;
    },
    setIsTransactionCreated(state, action: PayloadAction<boolean>) {
      state.isTransactionCreated = action.payload;
    },
    setSaleIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
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
  setSelectedBundleId,
  setIsTransactionCreated,
  setSaleIsLoading,
  clearPurchase,
} = saleSlice.actions;

export default saleSlice.reducer;
