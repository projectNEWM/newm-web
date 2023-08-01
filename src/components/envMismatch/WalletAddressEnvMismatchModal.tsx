import { FunctionComponent } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { updateWalletAddress } from "modules/session";
import { Button } from "elements";
import { useAppDispatch } from "common";
import { Modal } from "components";

interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

/**
 * Prompts a user whether they would like to update their saved wallet
 * address with an address from the currently connected wallet.
 */
const WalletAddressEnvMismatchModal: FunctionComponent<Props> = ({
  isOpen,
  onClose,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleConfirm = () => {
    dispatch(updateWalletAddress());
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={ isOpen } onClose={ handleClose } isCloseButtonVisible={ false }>
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
            Your saved wallet address does not match the current application
            environment. Would you like to update your saved address with an
            address from the currently connected wallet?
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

export default WalletAddressEnvMismatchModal;
