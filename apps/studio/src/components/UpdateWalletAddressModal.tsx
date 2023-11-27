import {
  selectUi,
  setUpdateWalletAddressModal,
} from "@newm.io/studio/modules/ui";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Button } from "@newm.io/studio/elements";
import { useAppDispatch } from "@newm.io/studio/common";
import {
  getWalletAddress,
  useConnectWallet,
} from "@newm.io/cardano-dapp-wallet-connector";
import { updateProfile } from "@newm.io/studio/modules/session";
import Modal from "./Modal";

const UpdateWalletAddressModal: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { wallet } = useConnectWallet();
  const {
    updateWalletAddressModal: { message, isConfirmationRequired },
  } = useSelector(selectUi);

  const emptyState = {
    message: "",
    isConfirmationRequired: false,
  };

  /**
   * Update wallet address saved to the user's profile and dismiss modal.
   */
  const handleConfirm = async () => {
    const walletAddress = await getWalletAddress(wallet);
    dispatch(updateProfile({ walletAddress }));
    dispatch(setUpdateWalletAddressModal(emptyState));
  };

  /**
   * Dismiss the modal.
   */
  const handleClose = () => {
    dispatch(setUpdateWalletAddressModal(emptyState));
  };

  return (
    <Modal
      isOpen={!!message}
      onClose={handleClose}
      isCloseButtonVisible={false}
    >
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
          <Typography>{message}</Typography>

          {isConfirmationRequired ? (
            <Stack direction="row" gap={2} justifyContent="flex-end">
              <Button
                width="compact"
                variant="secondary"
                color="music"
                onClick={handleClose}
              >
                No
              </Button>

              <Button width="compact" onClick={handleConfirm}>
                Yes
              </Button>
            </Stack>
          ) : (
            <Box display="flex" justifyContent="flex-end">
              <Button width="compact" onClick={handleClose}>
                Ok
              </Button>
            </Box>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};

export default UpdateWalletAddressModal;
