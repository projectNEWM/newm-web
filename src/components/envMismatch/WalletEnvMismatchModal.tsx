import { FunctionComponent } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Modal } from "components";

interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

/**
 * Prompts a user to select the correct wallet environment to
 * match the application environment and then refresh the page.
 */
const WalletEnvMismatchModal: FunctionComponent<Props> = ({
  isOpen,
  onClose,
}) => {
  const theme = useTheme();

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={ isOpen } onClose={ handleClose }>
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
            There is a mismatch between the environment for your connected
            wallet and the application environment. Please switch to the correct
            wallet environment and refresh the page.
          </Typography>
        </Stack>
      </Box>
    </Modal>
  );
};

export default WalletEnvMismatchModal;
