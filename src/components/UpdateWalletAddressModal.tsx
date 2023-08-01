import { selectUi, setIsUpdateWalletAddressModalOpen } from "modules/ui";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Button } from "elements";
import { updateWalletAddress } from "modules/session";
import { useAppDispatch } from "common";
import Modal from "./Modal";

const UpdateWalletAddressModal: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { isUpdateWalletAddressModalOpen } = useSelector(selectUi);

  const handleClose = () => {
    dispatch(setIsUpdateWalletAddressModalOpen(false));
  };

  const handleConfirm = () => {
    dispatch(updateWalletAddress());
    dispatch(setIsUpdateWalletAddressModalOpen(false));
  };

  return (
    <Modal
      isOpen={ isUpdateWalletAddressModalOpen }
      onClose={ handleClose }
      isCloseButtonVisible={ false }
    >
      <Box display="flex" flex={ 1 } justifyContent="center" alignItems="center">
        <Stack
          gap={ 2 }
          sx={ {
            padding: 2,
            background: theme.colors.grey600,
            textAlign: "left",
            maxWidth: "85%",
          } }
        >
          <Typography>
            You already have a wallet address saved to your profile. Would you
            like to update it with an address from the recently connected
            wallet?
          </Typography>

          <Stack direction="row" gap={ 2 } justifyContent="flex-end">
            <Button
              width="compact"
              variant="secondary"
              color="music"
              onClick={ handleClose }
            >
              No
            </Button>

            <Button width="compact" onClick={ handleConfirm }>
              Yes
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default UpdateWalletAddressModal;
