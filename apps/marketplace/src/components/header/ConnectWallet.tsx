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

const ConnectWallet: FunctionComponent = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletAdaBalance, setWalletAdaBalance] = useState(0);
  const [walletNewmBalance, setWalletNewmBalance] = useState(0);
  const [isWalletModalOpen, setisWalletModalOpen] = useState(false);
  const [isWalletEnvModalOpen, setIsWalletEnvModalOpen] = useState(false);

  const { wallet, getBalance, getAddress } = useConnectWallet();
  const { data: adaConversion = {} } = useGetAdaUsdConversionRateQuery();
  const { data: newmConversion = {} } = useGetNewmUsdConversionRateQuery();

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
