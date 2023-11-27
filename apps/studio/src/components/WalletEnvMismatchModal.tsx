import { FunctionComponent, useEffect } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Modal } from "@newm.io/studio/components";
import { useAppDispatch, useAppSelector } from "@newm.io/studio/common";
import {
  selectUi,
  setIsWalletEnvMismatchModalOpen,
} from "@newm.io/studio/modules/ui";
import { getIsWalletEnvMismatch } from "@newm.io/studio/modules/session";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";

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
    <Modal isOpen={isWalletEnvMismatchModalOpen} onClose={handleClose}>
      <Box display="flex" flex={1} justifyContent="center" alignItems="center">
        <Stack
          gap={2}
          sx={{
            padding: 2,
            background: theme.colors.grey600,
            textAlign: "left",
            maxWidth: "85%",
          }}
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
