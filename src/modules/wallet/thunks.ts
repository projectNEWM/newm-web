import { createAsyncThunk } from "@reduxjs/toolkit";
import { setIsSelectWalletModalOpen, setToastMessage } from "modules/ui";
import { RootState } from "store";
import { alphaAdvantageApi, binanceApi, coinGeckoApi } from "api";
import { setWalletIsConnected, setWalletName } from "./slice";
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
      dispatch(setWalletIsConnected(false));
      return;
    }

    const wallet = window.cardano[walletName];

    if (!wallet) {
      // wallet was connected before but extension has been removed
      dispatch(setWalletName(""));
      dispatch(setWalletIsConnected(false));
      return;
    }

    // check wallect enabled status
    const isConnected = await wallet.isEnabled();

    if (isConnected) {
      // enabled wallet API can be stored without prompting user
      const enabledWallet = await wallet.enable();
      window.Wallets[walletName] = enabledWallet;
    }

    dispatch(setWalletIsConnected(isConnected));
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

      dispatch(setWalletIsConnected(true));
      dispatch(setIsSelectWalletModalOpen(false));
    } catch (err) {
      if (err instanceof Error && err.message !== "user canceled connection") {
        dispatch(setToastMessage("Error occurred while enabling the wallet."));
      }
    }
  }
);

/**
 * Attempts to fetch Cardano/USD rate from multiple APIs. Will stop as soon as
 * a response is successful. This is because the CoinGecko and AlphaAdvantage
 * APIs are more accurate but have request rate limits, while the Binance API
 * is less accurate, but doesn't have an request rate limit.
 */
export const getAdaUsdRate = createAsyncThunk(
  "wallet/getAdaUsdRate",
  async () => {
    const respA = await coinGeckoApi.endpoints.getAdaUsdRate.initiate();

    if ("data" in respA) return;

    const respB = await alphaAdvantageApi.endpoints.getAdaUsdRate.initiate();

    if ("data" in respB) return;

    await binanceApi.endpoints.getAdaUsdRate.initiate();
  }
);
