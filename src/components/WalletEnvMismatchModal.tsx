import { FunctionComponent, useEffect } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Modal } from "components";
import { useAppDispatch, useAppSelector } from "common";
import { selectUi, setIsWalletEnvMismatchModalOpen } from "modules/ui";
import { useIsWalletEnvMismatch } from "modules/session";

/**
 * Prompts a user to select the correct wallet environment to
 * match the application environment and then refresh the page.
 */
const WalletEnvMismatchModal: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { isWalletEnvMismatchModalOpen } = useAppSelector(selectUi);
  const isEnvMismatch = useIsWalletEnvMismatch();

  const handleClose = () => {
    dispatch(setIsWalletEnvMismatchModalOpen(false));
  };

  useEffect(() => {
    if (isEnvMismatch) {
      dispatch(setIsWalletEnvMismatchModalOpen(true));
    }
  }, [isEnvMismatch, dispatch]);

  return (
    <Modal isOpen={ isWalletEnvMismatchModalOpen } onClose={ handleClose }>
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
