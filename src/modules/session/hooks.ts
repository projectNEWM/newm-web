import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { isProd } from "buildParams";
import { useAppSelector } from "common";
import { useEffect, useMemo, useState } from "react";
import { selectSession } from "./selectors";
import { emptyProfile, useGetProfileQuery } from "./api";

/**
 * Checks whether the currently connected wallet matches
 * the application environment.
 * @returns true if the wallet env doesn't match the application env.
 */
export const useIsWalletEnvMismatch = () => {
  const { wallet } = useConnectWallet();

  const [isMismatch, setIsMismatch] = useState(false);

  useEffect(() => {
    if (!wallet) return;

    const updateNetworkId = async () => {
      const networkId = await wallet.getNetworkId();
      const isWalletProd = networkId === 1;

      if (isProd !== isWalletProd) {
        setIsMismatch(true);
      }
    };

    updateNetworkId();
  }, [wallet]);

  return isMismatch;
};

/**
 * Checks whether the wallet address saved to the user's profile
 * matches the application environment.
 * @returns true if the saved address is for the incorrect environment
 */
export const useIsSavedWalletAddressEnvMismatch = () => {
  const { isLoggedIn } = useAppSelector(selectSession);
  const { data: { walletAddress } = emptyProfile } = useGetProfileQuery(
    undefined,
    {
      skip: !isLoggedIn,
    }
  );

  const isTestAddr = !!walletAddress?.startsWith("addr_test");
  const isProdAddr = !!walletAddress && !walletAddress.startsWith("addr_test");

  const isMismatch = useMemo(() => {
    return (isProd && isTestAddr) || (!isProd && isProdAddr);
  }, [isProdAddr, isTestAddr]);

  return isMismatch;
};
