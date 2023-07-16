import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useAppDispatch } from "common";
import Modal from "components/Modal";
import {
  clearProgressBarModal,
  selectUi,
  setIsProgressBarModalOpen,
} from "modules/ui";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import ProgressBar from "./ProgressBar";

const ProgressBarModal: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const {
    isProgressBarModalOpen,
    progressBarModal: { progress, message, disclaimer, animationSeconds },
  } = useSelector(selectUi);

  const handleClose = () => {
    dispatch(setIsProgressBarModalOpen(false));
    dispatch(clearProgressBarModal());
  };

  return (
    <Modal
      isOpen={ isProgressBarModalOpen }
      isCloseButtonVisible={ false }
      onClose={ handleClose }
    >
      <Box display="flex" flex={ 1 } justifyContent="center" alignItems="center">
        <Stack
          gap={ 2 }
          sx={ {
            padding: 2,
            width: "90%",
            background: theme.colors.grey600,
            textAlign: "center",
          } }
        >
          <ProgressBar
            progress={ progress }
            animationSeconds={ animationSeconds }
          />

          <Stack gap={ 1 }>
            <Typography
              variant="subtitle1"
              sx={ { color: theme.colors.white, fontStyle: "italic" } }
            >
              { message }
            </Typography>

            { !!disclaimer && <Typography>{ disclaimer }</Typography> }
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ProgressBarModal;
