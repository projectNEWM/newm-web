import { FunctionComponent, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import {
  DisconnectWalletButton,
  WalletEnvMismatchModal,
  WalletModal,
} from "@newm-web/components";
import {
  LOVELACE_CONVERSION,
  NEWM_ASSET_NAME,
  NEWM_POLICY_ID,
  getIsWalletEnvMismatch,
} from "@newm-web/utils";
import { DEXHUNTER_TOOLS_PARTNER_CODE } from "@newm-web/env";
import {
  selectUi,
  setIsConnectWalletModalOpen,
  setToastMessage,
} from "../modules/ui";
import { useAppDispatch, useAppSelector } from "../common";
import {
  useGetAdaUsdConversionRateQuery,
  useGetNewmUsdConversionRateQuery,
} from "../modules/wallet";

const ConnectWallet: FunctionComponent = () => {
  const defaultUsdPrice = { usdPrice: 0 };

  const dispatch = useAppDispatch();
  const { isConnectWalletModalOpen } = useAppSelector(selectUi);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletAdaBalance, setWalletAdaBalance] = useState(0);
  const [walletNewmBalance, setWalletNewmBalance] = useState(0);
  const [isWalletEnvModalOpen, setIsWalletEnvModalOpen] = useState(false);
  const { wallet, getBalance, getTokenBalance, getAddress } =
    useConnectWallet();
  const { data: { usdPrice: adaUsdPrice } = defaultUsdPrice } =
    useGetAdaUsdConversionRateQuery();
  const { data: { usdPrice: newmUsdPrice } = defaultUsdPrice } =
    useGetNewmUsdConversionRateQuery();

  const adaUsdBalance = (adaUsdPrice * walletAdaBalance) / LOVELACE_CONVERSION;
  const newmUsdBalance =
    (newmUsdPrice * walletNewmBalance) / LOVELACE_CONVERSION;

  const handleConnectWallet = async () => {
    if (!wallet) return;

    const isWalletEnvMismatch = await getIsWalletEnvMismatch(wallet);

    if (isWalletEnvMismatch) {
      setIsWalletEnvModalOpen(true);
    } else {
      dispatch(
        setToastMessage({
          message: "Wallet successfully connected",
          severity: "success",
        })
      );
    }
  };

  const handleDisconnectWallet = () => {
    dispatch(setIsConnectWalletModalOpen(true));
  };

  const handleResetWallet = () => {
    setWalletAdaBalance(0);
    setWalletNewmBalance(0);
    setWalletAddress("");
  };

  const handleCloseWalletEnvModal = () => {
    setIsWalletEnvModalOpen(false);
  };

  /**
   * Gets the ADA balance from the wallet and updates the state.
   */
  useEffect(() => {
    if (wallet) {
      getBalance((value) => {
        setWalletAdaBalance(value);
      });
    }
  }, [wallet, getBalance]);

  /**
   * Gets the NEWM balance from the wallet and updates the state.
   */
  useEffect(() => {
    const callback = (value: number) => {
      setWalletNewmBalance(value);
    };

    if (wallet) {
      getTokenBalance(NEWM_POLICY_ID, callback, NEWM_ASSET_NAME);
    }
  }, [wallet, getTokenBalance]);

  /**
   * Gets an address from the wallet and updates the state.
   */
  useEffect(() => {
    if (wallet) {
      getAddress((value) => {
        setWalletAddress(value);
      });
    }
  }, [wallet, getAddress]);

  return (
    <Grid>
      <WalletModal
        isOpen={ isConnectWalletModalOpen }
        onClose={ () => dispatch(setIsConnectWalletModalOpen(false)) }
        onConnect={ handleConnectWallet }
        onDisconnect={ handleResetWallet }
      />

      <WalletEnvMismatchModal
        isOpen={ isWalletEnvModalOpen }
        onClose={ handleCloseWalletEnvModal }
      />

      { wallet && (
        <DisconnectWalletButton
          adaBalance={ walletAdaBalance }
          adaUsdBalance={ adaUsdBalance }
          address={ walletAddress }
          newmBalance={ walletNewmBalance }
          newmUsdBalance={ newmUsdBalance }
          partnerCode={ DEXHUNTER_TOOLS_PARTNER_CODE }
          partnerName="NEWMTools"
          onDisconnect={ handleDisconnectWallet }
        />
      ) }
    </Grid>
  );
};

export default ConnectWallet;
