import { FunctionComponent, useEffect } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Modal } from "@newm-web/elements";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { useAppDispatch, useAppSelector } from "../common";
import { selectUi, setIsWalletEnvMismatchModalOpen } from "../modules/ui";
import { getIsWalletEnvMismatch } from "../modules/session";

/**
 * Prompts a user to select the correct wallet environment to
 * match the application environment and then refresh the page.
 */
const WalletEnvMismatchModal: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { wallet } = useConnectWallet();
  const { isWalletEnvMismatchModalOpen } = useAppSelector(selectUi);

  const handleClose = () => {
    dispatch(setIsWalletEnvMismatchModalOpen(false));
  };

  useEffect(() => {
    const handleOpen = async () => {
      if (!wallet) return;

      const isEnvMismatch = await getIsWalletEnvMismatch(wallet);

      if (isEnvMismatch) {
        dispatch(setIsWalletEnvMismatchModalOpen(true));
      }
    };

    handleOpen();
  }, [dispatch, wallet]);

  return (
    <Modal isOpen={ isWalletEnvMismatchModalOpen } onClose={ handleClose }>
      <Box alignItems="center" display="flex" flex={ 1 } justifyContent="center">
        <Stack
          gap={ 2 }
          sx={ {
            background: theme.colors.grey600,
            maxWidth: "85%",
            padding: 2,
            textAlign: "left",
          } }
        >
          <Typography>
            There is a mismatch between the environment for your connected
            wallet and the application environment. Please switch to the correct
            wallet environment and then disconnect and reconnect the wallet.
          </Typography>
        </Stack>
      </Box>
    </Modal>
  );
};

export default WalletEnvMismatchModal;
