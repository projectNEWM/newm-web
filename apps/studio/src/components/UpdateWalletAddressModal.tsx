import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Button } from "@newm-web/elements";
import {
  getWalletAddress,
  useConnectWallet,
} from "@newm.io/cardano-dapp-wallet-connector";
import { Modal } from "@newm-web/elements";
import { useAppDispatch } from "../common";
import { updateProfile } from "../modules/session";
import { selectUi, setUpdateWalletAddressModal } from "../modules/ui";

const UpdateWalletAddressModal: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { wallet } = useConnectWallet();
  const {
    updateWalletAddressModal: { message, isConfirmationRequired },
  } = useSelector(selectUi);

  const emptyState = {
    isConfirmationRequired: false,
    message: "",
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
      isCloseButtonVisible={ false }
      isOpen={ !!message }
      onClose={ handleClose }
    >
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
          <Typography>{ message }</Typography>

          { isConfirmationRequired ? (
            <Stack direction="row" gap={ 2 } justifyContent="flex-end">
              <Button
                color="music"
                variant="secondary"
                width="compact"
                onClick={ handleClose }
              >
                No
              </Button>

              <Button width="compact" onClick={ handleConfirm }>
                Yes
              </Button>
            </Stack>
          ) : (
            <Box display="flex" justifyContent="flex-end">
              <Button width="compact" onClick={ handleClose }>
                Ok
              </Button>
            </Box>
          ) }
        </Stack>
      </Box>
    </Modal>
  );
};

export default UpdateWalletAddressModal;
