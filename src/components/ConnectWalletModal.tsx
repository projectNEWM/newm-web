import {
  selectUi,
  setIsConnectWalletModalOpen,
  setToastMessage,
} from "modules/ui";
import { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  WalletModal,
  // getWalletAddress,
  useConnectWallet,
} from "@newm.io/cardano-dapp-wallet-connector";
import { useTheme } from "@mui/material";
// import { useCreateMintSongPaymentMutation } from "modules/wallet";

const ConnectWalletModal: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isConnectWalletModalOpen } = useSelector(selectUi);
  const { wallet } = useConnectWallet();
  // const [createMintSongPayment, { data }] = useCreateMintSongPaymentMutation();

  useEffect(() => {
    const getUtxos = async () => {
      if (wallet) {
        // const [utxos, address] = await Promise.all([
        //   wallet.getUtxos(),
        //   getWalletAddress(wallet),
        // ]);
        // console.log("utxos: ", utxos); // eslint-disable-line
        // console.log("address: ", address); // eslint-disable-line
        // createMintSongPayment({
        //   changeAddress: address,
        //   utxoCborHexList: utxos,
        // });
      }
    };

    getUtxos();
  }, [wallet]);

  const handleConnect = () => {
    dispatch(
      setToastMessage({
        message: "Wallet successfully connected",
        severity: "success",
      })
    );
  };

  const handleError = (message: string) => {
    dispatch(
      setToastMessage({
        message,
        severity: "error",
      })
    );
  };

  return (
    <WalletModal
      isOpen={ isConnectWalletModalOpen }
      onConnect={ handleConnect }
      onError={ handleError }
      style={ {
        backgroundColor: theme.colors.grey400,
      } }
      headerStyle={ {
        backgroundColor: theme.colors.grey500,
        borderBottomColor: theme.colors.grey500,
      } }
      disconnectButtonStyle={ {
        borderRadius: "4px",
        border: `2px solid ${theme.colors.white}`,
      } }
      isInverted={ true }
      fontFamily="Inter"
      onClose={ () => dispatch(setIsConnectWalletModalOpen(false)) }
    />
  );
};

export default ConnectWalletModal;
