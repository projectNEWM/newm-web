import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  EnabledWallet,
  signWalletTransaction,
} from "@newm.io/cardano-dapp-wallet-connector";
import { asThunkHook, encodeAddress } from "@newm-web/utils";
import { extendedApi as newmApi } from "./api";
import { ChallengeMethod } from "./types";
import { setConnectionData } from "./slice";
import { setToastMessage } from "../ui";

interface ConnectFromMobile {
  readonly isHardwareWallet: boolean;
  readonly wallet: EnabledWallet;
}

export const connectFromMobile = createAsyncThunk(
  "wallet/connectFromMobile",
  async ({ wallet, isHardwareWallet }: ConnectFromMobile, { dispatch }) => {
    try {
      if (!wallet) return;

      let connection;
      const adresses = await wallet.getRewardAddresses();
      const stakeAddress = encodeAddress(adresses[0]);
      const changeAddress = encodeAddress(await wallet.getChangeAddress());
      const utxoCborHexList = await wallet.getUtxos("1a001e8480");

      if (isHardwareWallet) {
        const getChallengeResp = await dispatch(
          newmApi.endpoints.generateChallenge.initiate({
            changeAddress,
            method: ChallengeMethod.SignedTransaction,
            stakeAddress,
            utxoCborHexList,
          })
        );

        if ("error" in getChallengeResp) return;

        const answer = await signWalletTransaction(
          wallet,
          getChallengeResp.data.payload
        );

        const answerChallengeResp = await dispatch(
          newmApi.endpoints.answerChallenge.initiate({
            challengeId: getChallengeResp.data.challengeId,
            payload: answer,
          })
        );

        if ("error" in answerChallengeResp) return;

        connection = answerChallengeResp.data;
      } else {
        const getChallengeResp = await dispatch(
          newmApi.endpoints.generateChallenge.initiate({
            changeAddress,
            method: ChallengeMethod.SignedData,
            stakeAddress,
            utxoCborHexList,
          })
        );

        if ("error" in getChallengeResp) return;

        const answer = await wallet.signData(
          stakeAddress,
          getChallengeResp.data.payload
        );

        const answerChallengeResp = await dispatch(
          newmApi.endpoints.answerChallenge.initiate({
            challengeId: getChallengeResp.data.challengeId,
            key: answer.key,
            payload: answer.signature,
          })
        );

        if ("error" in answerChallengeResp) return;

        connection = answerChallengeResp.data;
      }

      dispatch(
        setConnectionData({
          connectionId: `newm-${connection.connectionId}`,
          expiresAt: connection.expiresAt,
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

export const useConnectFromMobileThunk = asThunkHook(connectFromMobile);
