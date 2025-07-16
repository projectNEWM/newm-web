import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  enableWallet,
  getWalletAddress,
  getWalletChangeAddress,
  signWalletTransaction,
} from "@newm.io/cardano-dapp-wallet-connector";
import {
  EARNINGS_IN_PROGRESS_UPDATED_EVENT,
  LOCAL_STORAGE_EARNINGS_IN_PROGRESS_KEY,
  asThunkHook,
} from "@newm-web/utils";
import { ClaimEarningsThunkRequest } from "@newm-web/types";
import { extendedApi as saleApi } from "./api";
import { setToastMessage } from "../ui";

/**
 * Claim earnings.
 */
export const claimEarnings = createAsyncThunk(
  "earings/claim",
  async (body: ClaimEarningsThunkRequest, { dispatch }) => {
    try {
      const wallet = await enableWallet();
      const changeAddress = await getWalletChangeAddress(wallet);
      const walletAddress = await getWalletAddress(wallet);
      const utxoCborHexList = await wallet.getUtxos(body.amountCborHex);

      if (!utxoCborHexList) {
        throw new Error(
          "Insufficient ADA in wallet. Please add ADA to your wallet and try again."
        );
      }

      const postEarningsResp = await dispatch(
        saleApi.endpoints.postEarnings.initiate({
          changeAddress,
          utxoCborHexList,
          walletAddress,
        })
      );

      if ("error" in postEarningsResp || !postEarningsResp.data) return;

      const signedTransaction = await signWalletTransaction(
        wallet,
        postEarningsResp.data.cborHex
      );

      await wallet.submitTx(signedTransaction);

      const { unclaimedEarningsInNEWM, unclaimedEarningsInUSD } = body;

      localStorage.setItem(
        LOCAL_STORAGE_EARNINGS_IN_PROGRESS_KEY,
        JSON.stringify({ unclaimedEarningsInNEWM, unclaimedEarningsInUSD })
      );

      window.dispatchEvent(new Event(EARNINGS_IN_PROGRESS_UPDATED_EVENT));

      dispatch(
        setToastMessage({
          message: "You have initiated a transaction to claim your earnings.",
          severity: "success",
        })
      );
    } catch (error) {
      // non-endpoint related error occur, show toast
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

export const useClaimEarningsThunk = asThunkHook(claimEarnings);
