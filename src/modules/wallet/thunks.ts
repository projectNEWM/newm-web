import { createAsyncThunk } from "@reduxjs/toolkit";
import { setToastMessage } from "modules/ui";
import { RootState } from "store";
import { setWalletIsLoading, setWalletName } from "./slice";
import { ensureWallets } from "./utils";

/**
 * Checks that a user's wallet has been connected
 * and still has connection permissions.
 */
export const enableConnectedWallet = createAsyncThunk(
  "wallet/checkWalletConnection",
  async (_, { getState, dispatch }) => {
    ensureWallets();

    const appState = getState() as RootState;
    const { walletName } = appState.wallet;

    if (!walletName) {
      // wallet has not been connected before
      return;
    }

    const wallet = window.cardano[walletName];

    if (!wallet) {
      // wallet was connected before but extension has been removed
      dispatch(setWalletName(""));
      return;
    }

    dispatch(setWalletIsLoading(true));

    // check wallect enabled status
    const isConnected = await wallet.isEnabled();

    if (isConnected) {
      // enabled wallet API can be stored without prompting user
      const enabledWallet = await wallet.enable();
      window.Wallets[walletName] = enabledWallet;
    }

    dispatch(setWalletIsLoading(false));
  }
);

/**
 * Enables the currently selected wallet.
 */
export const enableWallet = createAsyncThunk(
  "wallet/enableWallet",
  async (_, { getState, dispatch }) => {
    ensureWallets();

    try {
      const appState = getState() as RootState;
      const { walletName } = appState.wallet;
      const wallet = window.cardano[walletName];

      const enabledWallet = await wallet.enable();
      window.Wallets[walletName] = enabledWallet;
    } catch (err) {
      if (err instanceof Error && err.message !== "user canceled connection") {
        dispatch(setToastMessage("Error occurred while enabling the wallet."));
      }
    }
  }
);
