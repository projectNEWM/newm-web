import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DisconnectWalletButton,
  WalletEnvMismatchModal,
  WalletModal,
} from "@newm-web/components";
import { Button } from "@newm-web/elements";
import { Grid } from "@mui/material";
import {
  LOVELACE_CONVERSION,
  LocalStorage,
  NEWM_ASSET_NAME,
  NEWM_POLICY_ID,
  getIsWalletEnvMismatch,
} from "@newm-web/utils";
import { DEXHUNTER_MARKETPLACE_PARTNER_CODE } from "@newm-web/env";
import { LocalStorageKey } from "@newm-web/types";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAdaUsdConversionRateQuery,
  useGetNewmUsdConversionRateQuery,
} from "../../modules/wallet/api";
import { selectUi, setIsConnectWalletModalOpen } from "../../modules/ui";
import {
  selectWallet,
  setWalletAdaBalance,
  setWalletAddress,
  setWalletNewmBalance,
} from "../../modules/wallet";

const ConnectWallet: FunctionComponent = () => {
  const defaultUsdPrice = { usdPrice: 0 };

  const dispatch = useDispatch();
  const router = useRouter();

  const [isWalletEnvModalOpen, setIsWalletEnvModalOpen] = useState(false);

  const { isConnectWalletModalOpen } = useSelector(selectUi);
  const { walletAdaBalance, walletNewmBalance, walletAddress } =
    useSelector(selectWallet);

  const { wallet, getBalance, getAddress, getTokenBalance } =
    useConnectWallet();
  const { data: { usdPrice: adaUsdPrice } = defaultUsdPrice } =
    useGetAdaUsdConversionRateQuery();
  const { data: { usdPrice: newmUsdPrice } = defaultUsdPrice } =
    useGetNewmUsdConversionRateQuery();

  const adaUsdBalance =
    typeof walletAdaBalance === "number"
      ? (adaUsdPrice * walletAdaBalance) / LOVELACE_CONVERSION
      : undefined;
  const newmUsdBalance =
    typeof walletNewmBalance === "number"
      ? (newmUsdPrice * walletNewmBalance) / LOVELACE_CONVERSION
      : undefined;

  const isNewmBalanceBadgeDismissed = !!LocalStorage.getItem(
    LocalStorageKey.isStudioNewmBalanceBadgeDismissed
  );

  const handleConnectWallet = async () => {
    if (!wallet) return;

    const isWalletEnvMismatch = await getIsWalletEnvMismatch(wallet);

    if (isWalletEnvMismatch) {
      setIsWalletEnvModalOpen(true);
    }
  };

  const handleDisconnectWallet = () => {
    dispatch(setIsConnectWalletModalOpen(true));
  };

  const handleResetWallet = () => {
    dispatch(setWalletAdaBalance(0));
    dispatch(setWalletNewmBalance(0));
    dispatch(setWalletAddress(""));
  };

  const handleCloseWalletEnvModal = () => {
    setIsWalletEnvModalOpen(false);
  };

  const handleDismissNewmBalanceBadge = () => {
    LocalStorage.setItem(
      LocalStorageKey.isStudioNewmBalanceBadgeDismissed,
      "true"
    );
  };

  const handleClaimEarnings = () => {
    router.push("/claim-earnings");
  };

  /**
   * Gets the ADA balance from the wallet and updates the state.
   */
  useEffect(() => {
    if (wallet) {
      getBalance((value) => {
        dispatch(setWalletAdaBalance(value));
      });
    }
  }, [wallet, getBalance, dispatch]);

  /**
   * Gets the NEWM balance from the wallet and updates the state.
   */
  useEffect(() => {
    const callback = (value: number) => {
      dispatch(setWalletNewmBalance(value));
    };

    if (wallet) {
      getTokenBalance(NEWM_POLICY_ID, callback, NEWM_ASSET_NAME);
    }
  }, [wallet, getTokenBalance, dispatch]);

  /**
   * Gets an address from the wallet and updates the state.
   */
  useEffect(() => {
    if (wallet) {
      getAddress((value) => {
        dispatch(setWalletAddress(value));
      });
    }
  }, [wallet, getAddress, dispatch]);

  return (
    <Grid>
      <WalletModal
        isOpen={ isConnectWalletModalOpen }
        omitWallets={ ["vespr"] }
        onClose={ () => dispatch(setIsConnectWalletModalOpen(false)) }
        onConnect={ handleConnectWallet }
        onDisconnect={ handleResetWallet }
      />

      <WalletEnvMismatchModal
        isOpen={ isWalletEnvModalOpen }
        onClose={ handleCloseWalletEnvModal }
      />

      { wallet ? (
        <DisconnectWalletButton
          adaBalance={ walletAdaBalance }
          adaUsdBalance={ adaUsdBalance }
          address={ walletAddress }
          isClaimEarningsEnabled={ true }
          isNewmBalanceBadgeEnabled={ !isNewmBalanceBadgeDismissed }
          newmBalance={ walletNewmBalance }
          newmUsdBalance={ newmUsdBalance }
          partnerCode={ DEXHUNTER_MARKETPLACE_PARTNER_CODE }
          partnerName="NEWMMarketplace"
          onClaimEarnings={ handleClaimEarnings }
          onDisconnect={ handleDisconnectWallet }
          onDismissNewmBalanceBadge={ handleDismissNewmBalanceBadge }
        />
      ) : (
        <Button
          gradient="crypto"
          width="compact"
          onClick={ () => dispatch(setIsConnectWalletModalOpen(true)) }
        >
          Connect Wallet
        </Button>
      ) }
    </Grid>
  );
};

export default ConnectWallet;
