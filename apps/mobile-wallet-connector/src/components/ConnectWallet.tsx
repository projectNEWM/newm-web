import currency from "currency.js";
import { FunctionComponent, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import {
  DisconnectWalletButton,
  WalletEnvMismatchModal,
  WalletModal,
} from "@newm-web/components";
import { getIsWalletEnvMismatch } from "@newm-web/utils";
import {
  selectUi,
  setIsConnectWalletModalOpen,
  setToastMessage,
} from "../modules/ui";
import { useAppDispatch, useAppSelector } from "../common";

const ConnectWallet: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { isConnectWalletModalOpen } = useAppSelector(selectUi);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [isWalletEnvModalOpen, setIsWalletEnvModalOpen] = useState(false);
  const { wallet, getBalance, getAddress } = useConnectWallet();

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

  const handleCloseWalletEnvModal = () => {
    setIsWalletEnvModalOpen(false);
  };

  /**
   * Gets the ADA balance from the wallet and updates the state.
   */
  useEffect(() => {
    if (wallet) {
      getBalance((value) => {
        const adaBalance = currency(value, { symbol: "" }).format();
        setWalletBalance(adaBalance);
      });
    }
  }, [wallet, getBalance]);

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
      />

      <WalletEnvMismatchModal
        isOpen={ isWalletEnvModalOpen }
        onClose={ handleCloseWalletEnvModal }
      />

      { wallet && (
        <DisconnectWalletButton
          address={ walletAddress }
          balance={ walletBalance }
          onDisconnect={ handleDisconnectWallet }
        />
      ) }
    </Grid>
  );
};

export default ConnectWallet;
