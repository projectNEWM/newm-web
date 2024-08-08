import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { FunctionComponent, useEffect, useState } from "react";
import {
  DisconnectWalletButton,
  WalletEnvMismatchModal,
  WalletModal,
} from "@newm-web/components";
import { Button } from "@newm-web/elements";
import { Grid } from "@mui/material";
import { getIsWalletEnvMismatch } from "@newm-web/utils";
import {
  useGetAdaUsdConversionRateQuery,
  useGetNewmUsdConversionRateQuery,
} from "../../modules/wallet/api";
import { NEWM_POLICY_ID, NEWM_TOKEN_NAME } from "../../common";

const ConnectWallet: FunctionComponent = () => {
  const defaultUsdPrice = { usdPrice: 0 };

  const [walletAddress, setWalletAddress] = useState("");
  const [walletAdaBalance, setWalletAdaBalance] = useState(0);
  const [walletNewmBalance, setWalletNewmBalance] = useState(0);
  const [isWalletModalOpen, setisWalletModalOpen] = useState(false);
  const [isWalletEnvModalOpen, setIsWalletEnvModalOpen] = useState(false);

  const { wallet, getBalance, getAddress, getTokenBalance } =
    useConnectWallet();
  const { data: { usdPrice: adaUsdPrice } = defaultUsdPrice } =
    useGetAdaUsdConversionRateQuery();
  const { data: { usdPrice: newmUsdPrice } = defaultUsdPrice } =
    useGetNewmUsdConversionRateQuery();

  const adaUsdBalance = (adaUsdPrice * walletAdaBalance) / 1000000;
  const adaNewmBalance = (newmUsdPrice * walletNewmBalance) / 1000000;

  const handleConnectWallet = async () => {
    if (!wallet) return;

    const isWalletEnvMismatch = await getIsWalletEnvMismatch(wallet);

    if (isWalletEnvMismatch) {
      setIsWalletEnvModalOpen(true);
    }
  };

  const handleDisconnectWallet = () => {
    setisWalletModalOpen(true);
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
      getTokenBalance(NEWM_POLICY_ID, callback, NEWM_TOKEN_NAME);
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
        isOpen={ isWalletModalOpen }
        onClose={ () => setisWalletModalOpen(false) }
        onConnect={ handleConnectWallet }
      />

      <WalletEnvMismatchModal
        isOpen={ isWalletEnvModalOpen }
        onClose={ handleCloseWalletEnvModal }
      />

      { wallet ? (
        <DisconnectWalletButton
          adaBalance={ walletAdaBalance }
          adaNewmBalance={ adaNewmBalance }
          adaUsdBalance={ adaUsdBalance }
          address={ walletAddress }
          newmBalance={ walletNewmBalance }
          onDisconnect={ handleDisconnectWallet }
        />
      ) : (
        <Button
          gradient="crypto"
          width="compact"
          onClick={ () => setisWalletModalOpen(true) }
        >
          Connect Wallet
        </Button>
      ) }
    </Grid>
  );
};

export default ConnectWallet;
