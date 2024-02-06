import { FunctionComponent, SyntheticEvent } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Modal } from "@newm-web/elements";

export interface WalletEnvMismatchModalProps {
  isOpen: boolean;
  onClose: (event: Event | SyntheticEvent) => void;
}

/**
 * Prompts a user to select the correct wallet environment to
 * match the application environment and then refresh the page.
 */
const WalletEnvMismatchModal: FunctionComponent<
  WalletEnvMismatchModalProps
> = ({ isOpen, onClose }) => {
  const theme = useTheme();

  return (
    <Modal isOpen={ isOpen } onClose={ onClose }>
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
