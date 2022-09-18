import { phyrhoseApi as api } from "api";
import { setToastMessage } from "modules/ui";
import { mursProjectId } from "buildParams";
import {
  receiveBundleSales,
  receivePaymentType,
  receivePurchaseOrder,
  receivePurchaseStatus,
  setSaleIsLoading,
} from "./slice";
import {
  PurchaseOrderRequest,
  PurchaseOrderResponse,
  PurchaseStatus,
  PurchaseStatusResponse,
  SaleBundlesResponse,
} from "./types";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSaleBundles: build.query<SaleBundlesResponse, void>({
      query: () => ({
        url: `firehose/ftSaleBundles?projectId=${mursProjectId}`,
        method: "GET",
      }),

      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(receiveBundleSales(data));
        } catch (err) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching sale information",
              severity: "error",
            })
          );
        }
      },
    }),

    createPurchaseOrder: build.mutation<
      PurchaseOrderResponse,
      PurchaseOrderRequest
    >({
      query: (body) => ({
        url: "firehose/createFtSalePurchaseOrder",
        method: "POST",
        body: {
          projectId: body.projectId,
          bundleId: body.bundleId,
          receiveAddress: body.receiveAddress,
        },
      }),

      async onQueryStarted({ paymentType }, { dispatch, queryFulfilled }) {
        try {
          dispatch(setSaleIsLoading(true));

          const { data } = await queryFulfilled;

          dispatch(receivePurchaseOrder(data));
          dispatch(receivePaymentType(paymentType));
          dispatch(receivePurchaseStatus(PurchaseStatus.Pending));
          // eslint-disable-next-line
        } catch (err: any) {
          const { error } = err;

          if (error?.status === 402) {
            // purchase is in progress, update Redux state purchase data
            dispatch(receivePurchaseOrder(error.data));
            dispatch(receivePaymentType(paymentType));
            dispatch(receivePurchaseStatus(PurchaseStatus.Pending));
            return;
          }

          dispatch(
            setToastMessage({
              message: "An error occurred while creating purchase order",
              severity: "error",
            })
          );
        } finally {
          setSaleIsLoading(false);
        }
      },
    }),

    getPurchaseStatus: build.query<PurchaseStatusResponse, number>({
      query: (purchaseId) => ({
        url: `firehose/purchaseStatus?purchaseId=${purchaseId}`,
        method: "GET",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(receivePurchaseStatus(data.data[1].status));
        } catch (err) {
          dispatch(
            setToastMessage({
              message: "An error occurred while creating purchase order",
              severity: "error",
            })
          );
        }
      },
    }),
  }),
});

export const { useGetSaleBundlesQuery } = extendedApi;

export default extendedApi;
