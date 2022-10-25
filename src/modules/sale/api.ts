import { phyrhoseApi as api } from "api";
import { projectDetails } from "buildParams";
import { setToastMessage } from "modules/ui";
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
        url: `firehose/ftSaleBundles?projectId=${projectDetails.projectId}`,
        method: "GET",
      }),

      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(receiveBundleSales(data));
          // eslint-disable-next-line
        } catch (err: any) {
          const { error } = err;
          const errorMessage = await error?.data?.message;
          const isClosed =
            error?.status === 404 &&
            errorMessage.toLowerCase().includes("is closed!");
          const isSaleEnded =
            error?.status === 404 &&
            errorMessage.toLowerCase().includes("sale has ended");
          const isSoldout =
            error?.status === 404 &&
            errorMessage.toLowerCase().includes("sold out");
          const isSoldoutCurrentPage =
            window?.location?.pathname.includes("sold-out");

          // sale is closed and countdown page is already displayed
          if (isClosed) {
            return;
          }

          // TODO: Modify redirect and logic below once "sale has ended" page is created
          // redirect to sold out page if the sale has ended
          if (isSaleEnded) {
            if (!isSoldoutCurrentPage) window.location.pathname = "sold-out";
            return;
          }

          // sale is sold out, redirect to sold out page
          if (isSoldout) {
            if (!isSoldoutCurrentPage) window.location.pathname = "sold-out";
            return;
          }

          dispatch(
            setToastMessage({
              message: errorMessage,
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
              message: getFormattedErrorMessage(error),
              severity: "error",
            })
          );
        } finally {
          dispatch(setSaleIsLoading(false));
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
          // eslint-disable-next-line
        } catch (err: any) {
          const { error } = err;

          dispatch(
            setToastMessage({
              message: error?.data?.message,
              severity: "error",
            })
          );
        }
      },
    }),
  }),
});

// eslint-disable-next-line
const getFormattedErrorMessage = (error: any) => {
  const status: number = error?.status;
  const message: string = error?.data?.message;

  if (!message) {
    return "An error occurred while creating the purchase order";
  }

  if (status === 406) {
    return `Not a valid staking address, please check that your wallet has the 
    necessary assets`;
  }

  if (message === "Illegal Network Detected!") {
    return "The wallet network is incorrect";
  }

  return message;
};

export const { useGetSaleBundlesQuery } = extendedApi;

export default extendedApi;
